

from sklearn.base import BaseEstimator,TransformerMixin

class HousingFeatureEngineer(BaseEstimator,TransformerMixin):
    def fit(self,X,y=None):
        return self;
    def transform(self,X):
        X = X.copy()
        X["rooms_per_household"] = (
            X["total_rooms"] /
            X["households"]
        )

        X["bedrooms_per_room"] = (
            X["total_bedrooms"] /
            X["total_rooms"]
        )

        X["population_per_household"] = (
            X["population"] /
            X["households"]
        )

        return X