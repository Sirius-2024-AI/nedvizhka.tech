from fastapi import FastAPI, Request, Response

from src.utils import *

app = FastAPI()


@app.get("/get_price")
async def get_price(request:Request, response:Response, city, area, kitchen_area, total_rooms, floor, total_floors, build_date, material_type,
                    remont, total_balcony, metro_name, metro_dist_km,distance_to_center):
    dict_data = {'city': city,
                 'area': area,
                 'kitchen_area': kitchen_area,
                 'total_rooms': total_rooms,
                 'floor': floor,
                 'total_floors': total_floors,
                 'build_date': build_date,
                 'material_type': material_type,
                 'remont': remont,
                 'total_balcony': total_balcony,
                 'metro_name': metro_name,
                 'metro_dist_km': metro_dist_km,
                 'distance_to_center': distance_to_center}
    return {"price": price_predict(dict_data)}
