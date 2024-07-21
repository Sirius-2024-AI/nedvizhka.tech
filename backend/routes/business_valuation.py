import json
import sqlalchemy
import datetime
import requests

from functions.get_geosuggest_data import get_geosuggest_data
from fastapi import status


def get_api_key_info(api_key, db, db_metadata, db_conn):
    db_table = sqlalchemy.Table('business_api_keys', db_metadata, autoload_with=db)
    query = db_table.select().where(db_table.c.api_key == api_key)
    return db_conn.execute(query).fetchone()


def business_valuation_route(parameters, config=None, db=None, db_metadata=None, db_conn=None, request=None, response=None):
    if parameters['api_key'] == None:
        return {
            'error': 'You must provide API key',
            'status_code': 403
        }
    
    needed_parameters = ['address', 'house_type', 'balcony', 'repair_type']
    for item in needed_parameters:
        if len(parameters[item]) == 0:
            return {
                'error': f'You must provide {item}',
                'status_code': 400
            }

    # Проверка API-ключа
    api_key_info = get_api_key_info(parameters['api_key'], db, db_metadata, db_conn)
    if api_key_info is None:
        return {
            'error': 'Invalid API key',
            'message': f'Please check an API key or request a new API key! Support: {config["mails"]["support"]}',
            'status_code': 403
        }
    else:
        api_expiry_date = api_key_info[2]

    if api_expiry_date < datetime.datetime.now():
        response.status_code = status.HTTP_403_FORBIDDEN
        return {
            'error': 'API key expired',
            'message': f'Please request a new API key! Support: {config["mails"]["support"]}',
            'status_code': 403
        }

    # Работа с Геосаджест API
    response = get_geosuggest_data(parameters['address'], config['third_party_api']['geosuggest'])
    response_json = json.loads(response)

    geosuggest_response = None
    if not ('results' in response_json):
        return {
            'error': 'Cannot find address',
            'status_code': 404
        }
    else:
        geosuggest_response = response_json['results'][0]['address']['formatted_address']
        city = parameters['city']

    # Обращение к ML-модели для получения оценки
    model_response = requests.get(config['ml_model']['url'], params={
        'city': parameters['city'],
        'area': parameters['area'],
        'kitchen_area': parameters['kitchen_area'],
        'total_rooms': parameters['count_rooms'],
        'floor': parameters['floor'],
        'total_floors': parameters['floor_count'],
        'build_date': parameters['construction_year'],
        'material_type': parameters['house_type'],
        'remont': parameters['repair_type'],
        'total_balcony': parameters['balcony'],
        'metro_name': parameters['metro_name'],
        'metro_dist_km': parameters['metro_dist_km'],
        'distance_to_center': parameters['distance_to_center']
    })
    valuation_value = model_response.json()['price']

    parameters['address'] = geosuggest_response
    if parameters['metro_name'] == '':
        parameters['metro_name'] = None
    if parameters['metro_dist_km'] == '':
        parameters['metro_dist_km'] = None
    db_table = sqlalchemy.Table('logs_business_valuation', db_metadata, autoload_with=db)
    insertion_query = db_table.insert().values(
        api_key=parameters['api_key'],
        address=geosuggest_response,
        area=parameters['area'],
        kitchen_area=parameters['kitchen_area'],
        count_rooms=parameters['count_rooms'],
        floor=parameters['floor'],
        floor_count=parameters['floor_count'],
        construction_year=parameters['construction_year'],
        house_type=parameters['house_type'],
        balcony=parameters['balcony'],
        repair_type=parameters['repair_type'],
        metro_name=parameters['metro_name'],
        metro_dist_km=parameters['metro_dist_km'],
        distance_to_center=parameters['distance_to_center'],
        valuation=valuation_value,
        user_ip=request.client.host
    )
    db_conn.execute(insertion_query)
    db_conn.commit()

    response_json = {
        "address": parameters['address'],
        "area": parameters['area'],
        "kitchen_area": parameters['kitchen_area'],
        "count_rooms": parameters['count_rooms'],
        "floor": parameters['floor'],
        "floor_count": parameters['floor_count'],
        "construction_year": parameters['construction_year'],
        "house_type": parameters['house_type'],
        "balcony": parameters['balcony'],
        "repair_type": parameters['repair_type'],
        "metro_name": parameters['metro_name'],
        "metro_dist_km": parameters['metro_dist_km'],
        "distance_to_center": parameters['distance_to_center'],
        "valuation": valuation_value
    }

    return response_json