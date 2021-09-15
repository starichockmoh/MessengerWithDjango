from django.urls import path
from thread import views

app_name = 'thread'
urlpatterns = [
    # Threads
    path('threads/', views.ThreadActiveOfUser.as_view()),
    path('threads_archive/', views.ThreadArchiveOfUser.as_view()),
    path('thread/<int:pk>/', views.ThreadDetail.as_view()),
    path('thread_push/<int:pk>/', views.ReductPushThread.as_view()),
    path('thread_archive/<int:pk>/', views.ReductArchiveThread.as_view()),
    path('thread_deleted/<int:pk>/', views.ReductDeletedThread.as_view()),
    path('write_messege/', views.WriteMessege.as_view()),
    path('reduct_messege_owner/<int:pk>/', views.ReductMessegeOwner.as_view()),
    path('reduct_messege/<int:pk>/', views.ReductMessege.as_view()),
    path('photo_of_messege/', views.MessegePhotoList.as_view())
]
