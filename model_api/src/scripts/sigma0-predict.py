#!/usr/bin/env python3
import time
import numpy as np
import pandas as pd
from catboost import CatBoostRegressor
from math import ceil
import argparse
import warnings

warnings.filterwarnings('ignore')

def get_dataset(dataset_path):
    df = pd.read_csv(dataset_path)
    df = df.drop(['address', 'longitude', 'latitude', 'uid', 'center_lat', 'center_lon'], axis=1)
    df = df.drop(['city_flat_mean_price', 'city_flat_mean_area', 'city_flat_center_distance', 'city_flat_mean_squared_price'], axis=1)
    df = df[df.price < 32_000_000]
    df['total_floors'][15785] = 17
    df = df.drop_duplicates()
    df = df[df.distance_to_center < 200]
    df2 = df[df.kitchen_area != 'empty']
    df3 = df[df.kitchen_area == 'empty']
    i = 0
    for value in df3.kitchen_area:
        if value == 'empty':
            df3.kitchen_area.iloc[i] = df3.area.iloc[i] * 0.2
        i += 1
        print("Preparing... ", ceil((100 * i)/len(df3.kitchen_area)), "%", end='\r')
    df = pd.concat([df2, df3], ignore_index=True)
    df.loc[df['total_balcony'] == '1.0', 'total_balcony'] = '1'
    df.loc[df['total_balcony'] == '2.0', 'total_balcony'] = '2'
    df.loc[df['total_balcony'] == 1.0, 'total_balcony'] = '1'
    df.loc[df['total_balcony'] == 2.0, 'total_balcony'] = '2'
    df.loc[df['total_balcony'] == 'empty', 'total_balcony'] = '1'

    df.loc[df['material_type'] == 'brick', 'material_type'] = 'Кирпичный'
    df.loc[df['material_type'] == 'Кирпичный', 'material_type'] = 'Кирпичный'

    df.loc[df['material_type'] == 'Железобетонный', 'material_type'] = 'Монолитный'
    df.loc[df['material_type'] == 'monolith', 'material_type'] = 'Монолитный'
    df.loc[df['material_type'] == 'Монолитный', 'material_type'] = 'Монолитный'
    df.loc[df['material_type'] == 'Смешанный', 'material_type'] = 'Монолитный'
    df.loc[df['material_type'] == 'Бетонный', 'material_type'] = 'Монолитный'
    df.loc[df['material_type'] == '0', 'material_type'] = 'Монолитный'
    df.loc[df['material_type'] == '0.0', 'material_type'] = 'Монолитный'
    df.loc[df['material_type'] == 'empty', 'material_type'] = 'Монолитный'

    df.loc[df['material_type'] == 'panel', 'material_type'] = 'Панельный'

    df.loc[df['material_type'] == 'block', 'material_type'] = 'Блочный'
    df.loc[df['material_type'] == 'Блочный', 'material_type'] = 'Блочный'
    df.loc[df['material_type'] == 'foamConcreteBlock', 'material_type'] = 'Блочный'
    df.loc[df['material_type'] == 'aerocreteBlock', 'material_type'] = 'Блочный'
    df.loc[df['material_type'] == 'gasSilicateBlock', 'material_type'] = 'Блочный'

    df.loc[df['material_type'] == 'wood', 'material_type'] = 'Деревянный'
    df.loc[df['material_type'] == 'Деревянный', 'material_type'] = 'Деревянный'

    df.loc[df['material_type'] == 'monolithBrick', 'material_type'] = 'Монолитно-кирпичный'
    df.loc[df['material_type'] == 'brick_monolith', 'material_type'] = 'Монолитно-кирпичный'

    df.loc[df['material_type'] == 'stalin', 'material_type'] = 'Сталинский'

    df.loc[df['material_type'] == 'old', 'material_type'] = 'Старый фонд'

    df = df[df.material_type != 'Иное']

    df.kitchen_area = df.kitchen_area.astype('float')
    df.total_floors = df.total_floors.astype('int')
    # df.build_date = df.build_date.astype('float')
    data = df.T.to_dict('dict')
    return data

def predict_build_year(model, city, price, area, kitchen_area, total_rooms, total_floors, material_type, remont, total_balcony, distance_to_center, year): 
    if year == '0' or year == '0.0' or year == 0.0 or year == 0 or year == 'empty':
        df_data = {
            'city': [city],
            'price': [price],
            'area': [area],
            'kitchen_area': [kitchen_area],
            'total_rooms': [total_rooms],
            'total_floors': [total_floors],
            'material_type': [material_type],
            'remont': [remont],
            'total_balcony': [total_balcony],
            'distance_to_center': [distance_to_center]
        }
        X = pd.DataFrame(data=df_data)
        y = model.predict(X) 
        return ceil(y)
    else: return year

def df_save(data, dataset_path):
    df = pd.DataFrame.from_dict(data)
    df = df.transpose()
    df.to_csv(dataset_path, index=False)

if __name__ == "__main__":
    model = CatBoostRegressor()
    model.load_model("../models/sigma0.cbm")
    
    parser = argparse.ArgumentParser(description="Program for predict build year")
    parser.add_argument('source', help="Path to source CSV file")
    parser.add_argument('output', help="Path to output CSV file")
    parser.add_argument('-v', "--verbose", action=argparse.BooleanOptionalAction, help="Print verbose info")
    arguments = parser.parse_args()
    
    start_time = time.perf_counter()
    data = get_dataset(arguments.source)
    for i in range(len(data)):
        j = data[i]
        city = j['city']
        price = j['price']
        area = j['area']
        kitchen_area = j['kitchen_area']
        total_rooms = j['total_rooms']
        total_floors = j['total_floors']
        material_type = j['material_type']
        remont = j['remont']
        total_balcony = j['total_balcony']
        distance_to_center = j['distance_to_center']
        year = j['build_date']
        year = predict_build_year(model, city, price, area, kitchen_area, total_rooms, total_floors, material_type, remont, total_balcony, distance_to_center, year)
        j['build_date'] = year
        
        if arguments.verbose == True:
            var_list = ['city', 'price', 'area', 'kitchen_area', 'total_rooms', 'total_floors', 'material_type', 'remont', 'total_balcony', 'distance_to_center', 'build_date']
            for element in var_list:
                print(element, "--->", j[element])
            print('-' * 20)
            
        print("Working...", str(i+1) + "/" + str(len(data)), ceil((i+1)*100/len(data)), "%", end='\r')
    df_save(data, arguments.output)
    
    program_time = time.perf_counter() - start_time
    print("The program finished in", program_time, "seconds.")    
