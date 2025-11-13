import joblib
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from pathlib import Path
import numpy as np

MODELS = Path('models')
MODELS.mkdir(exist_ok=True)

class SimpleRegressor:
    def __init__(self, alpha=1.0):
        self.pipeline = Pipeline([('scaler', StandardScaler()), ('reg', Ridge(alpha=alpha))])

    def train(self, X, y):
        self.pipeline.fit(X, y)
        return self

    def predict(self, X):
        return self.pipeline.predict(X)

    def save(self, name='reg.joblib'):
        joblib.dump(self.pipeline, MODELS / name)

    @classmethod
    def load(cls, name='reg.joblib'):
        p = joblib.load(MODELS / name)
        inst = cls()
        inst.pipeline = p
        return inst

    def summary(self):
        try:
            model = self.pipeline.named_steps['reg']
            coef = getattr(model, 'coef_', None)
            intercept = getattr(model, 'intercept_', None)
            return {'coef': coef.tolist() if coef is not None else None, 'intercept': float(intercept) if intercept is not None else None}
        except Exception:
            return {}
