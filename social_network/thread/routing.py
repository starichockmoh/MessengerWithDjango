from django.urls import re_path

from thread import consumers

websocket_urlpatterns = [
    re_path(r'ws/thread/(?P<thread_id>\d+)/$', consumers.MessageConsumer.as_asgi()),
]
# r'ws/chat/(?P<room_name>\w+)/$'
