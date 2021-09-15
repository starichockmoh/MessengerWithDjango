from django.urls import path
from main import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'main'
urlpatterns = [

    # Account
    path('registr/', views.Register.as_view()),
    path('current_profile/', views.CurrentProfile.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/<int:pk>/', views.Profile.as_view()),
]
