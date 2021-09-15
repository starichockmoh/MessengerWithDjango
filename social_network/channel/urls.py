from django.urls import path
from channel import views

app_name = 'channel'
urlpatterns = [
    # Channels
    path('channels/', views.ChannelList.as_view()),
    path('channel/<int:pk>/', views.ChannelDetail.as_view()),
    path('channel_delete_user/<int:pk>/<int:user_pk>/', views.DeleteFromChannel.as_view()),
    path('channel_add_delete_user/<int:pk>/', views.AddOrDeleteFromChannel.as_view()),
    path('post/', views.PostList.as_view()),
    path('post/<int:pk>/', views.PostDetail.as_view()),
    path('comment/', views.CommentList.as_view()),
    path('comment/<int:pk>/', views.CommentDetail.as_view()),
    path('photo_of_post/', views.PostPhotoList.as_view()),
    path('delete_add_admin/<channel_pk>/<user_pk>/', views.DeleteOrAddAdmin.as_view()),
]
