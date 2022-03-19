from django.urls import path
from account import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'account'
urlpatterns = [
    # Account
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registr/', views.Register.as_view()),
    path('current_profile/', views.CurrentProfile.as_view()),
    path('profile/<int:pk>/', views.Profile.as_view()),
    path('photo_of_user/', views.PhotoOfUserList.as_view()),
    path('photo_of_user/<int:photo_pk>/', views.PhotoOfUserDetail.as_view()),

]
