from django.urls import path
from .views import DeriveView

urlpatterns = [
    path('derive/', DeriveView.as_view(), name='sympy-derive'),
]
