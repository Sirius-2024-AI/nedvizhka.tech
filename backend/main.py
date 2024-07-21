# Import modules
import os

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import json
import sqlalchemy

# Import routes
from routes.individual_valuation import individual_valuation_route
from routes.business_request_route import business_request_route
from routes.business_valuation import business_valuation_route

# Import models
from models.Individual_Valuation import IndividualValuation
from models.Business_Request import BusinessRequest


def init_config():
    with open("config.json", encoding="utf-8") as f:
        cfg = json.load(f)
        cfg['database']['password'] = os.environ.get("DATABASE_PASSWORD", default="admin")
        cfg['database']['host'] = os.environ.get("DATABASE_HOST", default="81.200.149.136")
        cfg['database']['user'] = os.environ.get("DATABASE_USER", default="admin")
        cfg['smtp']['auth']['password'] = os.environ.get("SMTP_PASSWORD", default="123")
        cfg['ml_model']['url'] = f"http://{os.environ.get('ML_MODEL_HOST', default='81.200.149.136')}:7777/get_price"
        return cfg


config = init_config()
app = FastAPI()

try:
    db = sqlalchemy.create_engine(
        "postgresql+psycopg2://{}:{}@{}:{}/{}".format(
            config["database"]["user"],
            config["database"]["password"],
            config["database"]["host"],
            config["database"]["port"],
            config["database"]["database"],
        )
    )

    conn = db.connect()
    metadata = sqlalchemy.MetaData()
except Exception as e:
    print(e)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/individual/valuation")
async def individual_valuation(parameters: IndividualValuation, request: Request, response: Response):
    return individual_valuation_route(parameters, config=config, db=db, db_metadata=metadata, db_conn=conn,
                                      request=request, response=response)


@app.post('/api/business/request')
async def business_request(parameters: BusinessRequest, request: Request):
    return business_request_route(parameters, config=config, db=db, db_metadata=metadata, db_conn=conn, request=request)


@app.get('/api/business/valuation')
async def business_valuation(
        request: Request,
        response: Response,
        api_key,
        address,
        city,
        area,
        kitchen_area,
        count_rooms,
        floor,
        floor_count,
        construction_year,
        house_type,
        balcony,
        repair_type,
        metro_name,
        metro_dist_km,
        distance_to_center
):
    return business_valuation_route({
        'api_key': api_key,
        'address': address,
        'city': city,
        'area': area,
        'kitchen_area': kitchen_area,
        'count_rooms': count_rooms,
        'floor': floor,
        'floor_count': floor_count,
        'construction_year': construction_year,
        'house_type': house_type,
        'balcony': balcony,
        'repair_type': repair_type,
        'metro_name': metro_name,
        'metro_dist_km': metro_dist_km,
        'distance_to_center': distance_to_center
    }, config=config, db=db, db_metadata=metadata, db_conn=conn, request=request, response=response)
