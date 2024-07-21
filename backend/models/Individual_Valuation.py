from pydantic import BaseModel
from typing import Union


class IndividualValuation(BaseModel):
    first_name: str
    last_name: str
    user_email: str
    user_phone: str
    address: str
    city: str
    area: float
    kitchen_area: float
    count_rooms: int
    floor: int
    floor_count: int
    construction_year: int
    house_type: str
    balcony: int
    repair_type: str
    metro_name: Union[str, None]
    metro_dist_km: Union[str, float, None]
    distance_to_center: float

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                 'first_name': 'Иванов',
                 'last_name': 'Ивановыч',
                 'user_email': 'fake@gmail.com',
                 'user_phone': '89345434453',
                 'address': 'тестовая улица дом 5',
                 'city': 'Анапа',
                 'area': 46.0,
                 'kitchen_area': 23.1,
                 'count_rooms': 2.0,
                 'floor': 6,
                 'floor_count': 8,
                 'construction_year': 1997,
                 'house_type': 'Монолитный',
                 'balcony': 1.0,
                 'repair_type': 'fine',
                 'metro_name': '',
                 'metro_dist_km': 0.0,
                 'distance_to_center': 10.867409215055272
                 }
            ]
        }
    }