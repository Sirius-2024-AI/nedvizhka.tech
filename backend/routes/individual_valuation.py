# -*- coding: utf-8 -*-
import json

import sqlalchemy
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
import requests
import time
import random
import os
from fastapi import status

from functions.get_geosuggest_data import get_geosuggest_data
from functions.get_full_parameters_name import get_full_parameters_name
from functions.get_mail_html import get_mail_html


def separate_number(x):
    return format(x, ',d').replace(",", " ")

def send_html_email(smtp_server, smtp_port, smtp_username, smtp_password, from_address, to_address, subject, html_content):
    # Создаем объект MIMEMultipart для создания письма с HTML
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = formataddr(('Недвижка.tech – оценим стоимость вашей недвижимости', from_address))
    msg['To'] = to_address

    # Добавляем HTML-часть к сообщению
    part = MIMEText(html_content, 'html')
    msg.attach(part)

    # Подключаемся к SMTP-серверу и отправляем письмо
    try:
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(smtp_username, smtp_password)
            server.sendmail(from_address, to_address, msg.as_string())
        print('Email sent successfully')
    except Exception as e:
        print(f'Failed to send email: {e}')

def individual_valuation_route(parameters, config=None, db=None, db_metadata=None, db_conn=None, request=None, response=None):
    # Проверка наличия необходимых параметров в конфигурационном файле
    if config is None:
        raise Exception('You must provide config to route function')

    if config['third_party_api']['geosuggest'] is None:
        raise Exception('You must provide Geosuggest api key to config')

    # Работа с Геосаджест API
    response
    for api_key in config['third_party_api']['geosuggest']:
        response = get_geosuggest_data(parameters.address, api_key)
        if response is not None:
            break
        
    response_json = json.loads(response)

    geosuggest_response = None
    if not ('results' in response_json):
        return {
            'error': 'Cannot find address',
            'status_code': 404
        }
    else:
        geosuggest_response = response_json['results'][0]['address']['formatted_address']

    # Проверка наличия данных в запросе
    if len(parameters.user_email) == 0:
        return {
            'error': "Email mustn't be empty",
            'status_code': 400
        }

    # Проверка города
    allowed_cities = ['Москва', 'Санкт-Петербург',
                      'Новосибирск', 'Екатеринбург',
                      'Казань', 'Нижний Новгород',
                      'Сочи', 'Геленджик', 'Самара',
                      'Анапа', 'Краснодар', 'Балашиха']
    if parameters.city not in allowed_cities:
        parameters.city = 'Самара'

    # Перевод параметров в читабельный вид для пользователя
    parameters = get_full_parameters_name(parameters)

    parameters.metro_name = parameters.metro_name if parameters.metro_name is not None else ''
    parameters.metro_dist_km = parameters.metro_dist_km if parameters.metro_dist_km is not None else ''

    # Обращение к ML-модели для получения оценки
    model_response = requests.get(config['ml_model']['url'], params={
        'city': parameters.city,
        'area': parameters.area,
        'kitchen_area': parameters.kitchen_area,
        'total_rooms': parameters.count_rooms,
        'floor': parameters.floor,
        'total_floors': parameters.floor_count,
        'build_date': parameters.construction_year,
        'material_type': parameters.house_type,
        'remont': parameters.repair_type,
        'total_balcony': parameters.balcony,
        'metro_name': parameters.metro_name,
        'metro_dist_km': parameters.metro_dist_km,
        'distance_to_center': parameters.distance_to_center
    })
    valuation_value = model_response.json()['price']

    # Сохранение отчетного электронного письма
    match parameters.repair_type:
        case 'without':
            parameters.repair_type = 'Без ремонта'
        case 'fine':
            parameters.repair_type = 'Евроремонт'
        case 'design':
            parameters.repair_type = 'Дизайнерский ремонт'
        case 'simple':
            parameters.repair_type = 'Стандартный ремонт'
        case 'rough':
            parameters.repair_type = 'Чистовая отделка'

    if parameters.balcony == 0:
        parameters.balcony = 'Отсутствует'

    mail_html = get_mail_html({
        'first_name': parameters.first_name,
        'last_name': parameters.last_name,
        'user_email': parameters.user_email,
        'user_phone': parameters.user_phone,
        'address': geosuggest_response,
        'area': str(parameters.area) + ' м²',
        'kitchen_area': str(parameters.kitchen_area) + ' м²',
        'count_rooms': parameters.count_rooms,
        'floor': parameters.floor,
        'floor_count': parameters.floor_count,
        'construction_year': parameters.construction_year,
        'house_type': parameters.house_type,
        'balcony': parameters.balcony,
        'repair_type': parameters.repair_type,
        'valuation': separate_number(valuation_value) + ' ₽',
    })

    # Отправка отчетного электронного письма
    send_html_email(config['smtp']['host'],
                    config['smtp']['port'],
                    config['smtp']['auth']['user'],
                    config['smtp']['auth']['password'],
                    config['smtp']['auth']['user'],
                    parameters.user_email,
                    f"Отчёт об оценке недвижимости: {geosuggest_response}",
                    mail_html)

    # Удаление отчетного электронного письма

    parameters.address = geosuggest_response
    if parameters.metro_name == '':
        parameters.metro_name = None
    if parameters.metro_dist_km == '':
        parameters.metro_dist_km = None

    try:
        db_table = sqlalchemy.Table('logs_individual_valuation', db_metadata, autoload_with=db)
        insertion_query = db_table.insert().values(
            first_name=parameters.first_name,
            last_name=parameters.last_name,
            user_email=parameters.user_email,
            user_phone=parameters.user_phone,
            address=geosuggest_response,
            area=parameters.area,
            kitchen_area=parameters.kitchen_area,
            count_rooms=parameters.count_rooms,
            floor=parameters.floor,
            floor_count=parameters.floor_count,
            construction_year=parameters.construction_year,
            balcony=parameters.balcony,
            house_type=parameters.house_type,
            repair_type=parameters.repair_type,
            metro_name=parameters.metro_name,
            metro_dist_km=parameters.metro_dist_km,
            distance_to_center=parameters.distance_to_center,
            valuation=valuation_value,
            user_ip=request.client.host
        )
        db_conn.execute(insertion_query)
        db_conn.commit()
    except Exception as e:
        print(f'Failed to log data into DB: {e}')

    response_json = {
        "first_name": parameters.first_name,
        "last_name": parameters.last_name,
        "user_email": parameters.user_email,
        "user_phone": parameters.user_phone,
        "address": parameters.address,
        "city": parameters.city,
        "area": parameters.area,
        "kitchen_area": parameters.kitchen_area,
        "count_rooms": parameters.count_rooms,
        "floor": parameters.floor,
        "floor_count": parameters.floor_count,
        "construction_year": parameters.construction_year,
        "house_type": parameters.house_type,
        "balcony": parameters.balcony,
        "repair_type": parameters.repair_type,
        "metro_name": parameters.metro_name,
        "metro_dist_km": parameters.metro_dist_km,
        "distance_to_center": parameters.distance_to_center
    }

    return response_json
