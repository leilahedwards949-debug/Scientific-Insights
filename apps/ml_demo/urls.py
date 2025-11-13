from django.urls import path
from .views import TrainView, PredictView, SummaryView

urlpatterns = [
    path('train/', TrainView.as_view(), name='ml-train'),
    path('predict/', PredictView.as_view(), name='ml-predict'),
    path('summary/', SummaryView.as_view(), name='ml-summary'),
]
