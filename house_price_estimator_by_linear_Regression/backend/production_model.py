import pandas as pd
import numpy as np 
import matplotlib.pyplot as plt
import joblib

from sklearn.model_selection import train_test_split,cross_val_score,GridSearchCV
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer 
from sklearn.preprocessing import StandardScaler,OneHotEncoder
from sklearn.metrics import r2_score,root_mean_squared_error,mean_absolute_error

from feature_engineering import HousingFeatureEngineer



# ============================================
# 1. LOAD DATA
# ============================================
data = pd.read_csv("housing.csv")


# ============================================
# 2. FEATURE ENGINEERING
# ============================================
# data["rooms_per_household"] = data["total_rooms"] / data["households"]

# data["bedrooms_per_room"] = data["total_bedrooms"] / data["total_rooms"]

# data["population_per_household"] = data["population"] / data["households"]
feature_engineering = HousingFeatureEngineer()

# ============================================
# 3. FEATURES AND TARGET
# ============================================
inputs =  data.drop("median_house_value",axis = 1)
target = data["median_house_value"]


# ============================================
# 4. IDENTIFY FEATURES
# ============================================
numerical_features =  inputs.select_dtypes(include=["int64","float64"]).columns
categorical_features = inputs.select_dtypes(include=["str","object","category"]).columns


# ============================================
# 5. TRAIN / TEST SPLIT
# ============================================
X_train,X_test,y_train,y_test =  train_test_split(inputs,
                                                  target,
                                                  test_size=0.2,
                                                  random_state=7)



# ============================================
# 6. NUMERICAL PIPELINE  AND CATEGORICAL PIPELINE
# ============================================
numerical_pipeline  = Pipeline([
    ("imputer",SimpleImputer(strategy="median")),
    ("scaler",StandardScaler())
])

categorical_pipeline = Pipeline([
    ("imputer",SimpleImputer(strategy="most_frequent")),
    ("encoder",OneHotEncoder())
])


# ============================================
# 7. PREPROCESSOR
# ============================================
preprocessor = ColumnTransformer([
    ("num",numerical_pipeline,numerical_features),
    ("cat",categorical_pipeline,categorical_features)
])


# ============================================
# 8. FINAL MODEL PIPELINE
# ============================================

model_pipeline =  Pipeline([
    ("features",feature_engineering),
   ( "preprocessor",preprocessor),
   ("model",Ridge(alpha=1))
])

# ============================================
# 9. TRAIN MODEL
# ============================================

model_pipeline.fit(X_train,y_train)

# ============================================
# 10. TEST MODEL
# ============================================

y_pred = model_pipeline.predict(
    X_test
)


# ============================================
# 11. EVALUATE
# ============================================

mae = mean_absolute_error(
    y_test,
    y_pred
)

rmse = root_mean_squared_error(
    y_test,
    y_pred
)

r2 = r2_score(
    y_test,
    y_pred
)


print("\n==============================")
print("FINAL MODEL")
print("==============================")

print("MAE :", mae)
print("RMSE:", rmse)
print("R²  :", r2)


# ============================================
# 12. SAVE MODEL
# ============================================
model_file = "house_price_model.joblib"
joblib.dump(
    model_pipeline,
    model_file
)
print("\nModel saved successfully!")
print("File:", model_file)