import pandas as pd
from catboost import CatBoostRegressor
from math import ceil
import json



MODEL = CatBoostRegressor().load_model(r'src/models/latest.cbm')


def price_predict(dict_param):
    df = pd.DataFrame.from_dict({'0': dict_param.values()}, columns=dict_param.keys(), orient='index')
    df = df[['city', 'area', 'kitchen_area', 'total_rooms', 'floor', 'total_floors',
       'build_date', 'material_type', 'remont', 'total_balcony', 'metro_name',
       'metro_dist_km', 'distance_to_center']]
    result = MODEL.predict(df)
    return ceil(result)
