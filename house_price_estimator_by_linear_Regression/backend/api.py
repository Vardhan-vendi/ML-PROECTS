import joblib
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


model = joblib.load(
    "house_price_model.joblib"
)


app = FastAPI(
    title="House Price Prediction API",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# REQUEST SCHEMA
# ============================================

class HouseData(BaseModel):

    longitude: float
    latitude: float
    housing_median_age: float

    total_rooms: float
    total_bedrooms: float

    population: float
    households: float

    median_income: float

    ocean_proximity: str


# ============================================
# ROOT ENDPOINT
# ============================================


@app.get('/')
def home():
        return {
        "message": "House Price Prediction API is running"
    }

@app.post("/predict")
def predict(data: HouseData):

    input_data = pd.DataFrame([data.model_dump()])

    prediction = model.predict(input_data)

    return {
        "predicted_house_value": float(prediction[0])
    }