from rest_framework.views import APIView
from rest_framework.response import Response
from .services import SimpleRegressor
import numpy as np

class TrainView(APIView):
    def post(self, request):
        data = request.data
        X = np.array(data.get('X'))
        y = np.array(data.get('y'))
        model = SimpleRegressor().train(X, y)
        model.save('reg.joblib')
        return Response({'message':'trained','result':{'n_samples': len(y)}, 'error': None})

class PredictView(APIView):
    def post(self, request):
        features = request.data.get('features')
        X = np.array(features)
        model = SimpleRegressor.load('reg.joblib')
        preds = model.predict(X)
        return Response({'message':'ok','result': preds.tolist(), 'error': None})

class SummaryView(APIView):
    def get(self, request):
        model = SimpleRegressor.load('reg.joblib')
        return Response({'message':'ok','result': model.summary(), 'error': None})
