#!/usr/bin/env python3

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from math import ceil
from math import sqrt
import warnings
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import json

cb_learn_rate = 0.005
n_iterations = 25000
early_stop_rounds = 400
opt_catboost_params = {'iterations' : n_iterations,
                       'learning_rate' : cb_learn_rate,
                       'loss_function' : 'RMSE', 
                       'eval_metric' : 'RMSE',
                       'verbose' : 500,
                       'random_seed' : 42,
                       'cat_features': [0, 6, 7]}

warnings.filterwarnings('ignore')

df = pd.read_csv("../src/alpha2_ultra.csv")
df = df.drop(['address', 'longitude', 'latitude', 'uid', 'center_lat', 'center_lon', 'floor', 'metro_name', 'metro_dist_km'], axis=1)
df = df[df.price < 32_000_000]
df['total_floors'][15785] = 17
df = df.drop_duplicates()
df = df.drop(['city_flat_mean_price', 'city_flat_mean_area', 'city_flat_center_distance', 'city_flat_mean_squared_price'], axis=1)

df = df[df.build_date.notna()]
df = df[df.build_date != 'empty']
df = df[~df.build_date.isin((0, 0.0, '0', '0.0'))]
df = df[df.distance_to_center < 200]
df2 = df[df.kitchen_area != 'empty']
df3 = df[df.kitchen_area == 'empty']

i = 0
for value in df3.kitchen_area:
    if value == 'empty':
        df3.kitchen_area.iloc[i] = df3.area.iloc[i] * 0.2
    i += 1
    print(ceil((100 * i)/len(df3.kitchen_area)), end='\r')
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
df.build_date = df.build_date.astype('float')
df.build_date =  df.build_date.astype('float')

x = df.drop(columns=['build_date'])
y = df['build_date']

X_train, X_test, y_train, y_test=train_test_split(x, y, test_size=0.2, shuffle=True, random_state=42)
X_train, X_val, y_train, y_val=train_test_split(X_train, y_train, test_size=0.2, shuffle=True, random_state=42)

print(x.columns)

model = CatBoostRegressor(**opt_catboost_params)
model.fit(X_train, y_train, eval_set=(X_val, y_val), 
           use_best_model=True, plot=True, 
           early_stopping_rounds=early_stop_rounds)

y_pred = model.predict(X_test)
    
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
    
print("Results for CatBoost:")
print("Mean Squared Error (MSE):", mse)
print("Root Mean Squared Error (RMSE):", sqrt(mse))
print("Mean Absolute Error (MAE):", mae)
print("R-squared Score:", r2)
print()

def plot_importance(model, features, dataframe):
    num = len(dataframe)
    feature_imp = pd.DataFrame({"Value": model.feature_importances_, "Feature": features.columns})
    plt.figure(figsize=(5, 5))
    sns.set_theme(font_scale=1)
    sns.barplot(x="Value", y="Feature", data=feature_imp.sort_values(by="Value", ascending=False)[0:40])
    plt.title("Features")
    plt.tight_layout()
    plt.show()

plot_importance(model, X_train, df)
model_path = "../models/sigma0.cbm"
model.save_model(model_path)