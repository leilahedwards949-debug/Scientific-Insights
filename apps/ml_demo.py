from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
import joblib
from pathlib import Path
from typing import Dict, Any

MODEL_DIR = Path('models')
MODEL_DIR.mkdir(exist_ok=True)


class SimpleRegressor:
    def __init__(self, alpha: float = 1.0):
        self.pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('reg', Ridge(alpha=alpha, random_state=42))
        ])

    def train(self, X, y):
        self.pipeline.fit(X, y)
        return self

    def predict(self, X):
        return self.pipeline.predict(X)

    def save(self, name: str = 'regressor.joblib'):
        joblib.dump({'pipeline': self.pipeline}, MODEL_DIR / name)

    @classmethod
    def load(cls, name: str = 'regressor.joblib'):
        payload = joblib.load(MODEL_DIR / name)
        inst = cls()
        inst.pipeline = payload['pipeline']
        return inst

    def summary(self) -> Dict[str, Any]:
        # best-effort summary; only valid for linear models
        try:
            reg = self.pipeline.named_steps['reg']
            coef = reg.coef_.tolist()
            intercept = float(reg.intercept_)
            return {'coefficients': coef, 'intercept': intercept}
        except Exception:
            return {'message': 'Summary not available for this model type.'}
