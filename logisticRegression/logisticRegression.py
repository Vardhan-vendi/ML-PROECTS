import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from torch import mode

data = pd.read_csv("./spam.csv",encoding="latin-1")

data = data[["v1","v2"]]

data.rename(columns={
    "v1": "output",
    "v2" : "message"
},inplace=True)



X = data["message"]
y = data["output"].map({
    "ham": 0,
    "spam":1
})


X_train,X_test,y_train,y_test =  train_test_split(X,y,test_size=0.2,random_state=7,stratify=y)
vectorizer = TfidfVectorizer()

X_train_tfidf =  vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)



model = LogisticRegression(max_iter= 1000)

model.fit(X_train_tfidf,y_train)


print(model.coef_)
print(model.coef_.shape)

feature_names = vectorizer.get_feature_names_out()
coefficients = model.coef_[0]


coef_df = pd.DataFrame({
    "word": feature_names,
    "coefficient": coefficients
})


# Strongest spam-associated features
print("\nTop spam-associated features:")

print(
    coef_df
    .sort_values(
        "coefficient",
        ascending=False
    )
    .head(20)
)




# Strongest ham-associated features
print("\nTop ham-associated features:")

print(
    coef_df
    .sort_values(
        "coefficient",
        ascending=True
    )
    .head(20)
)