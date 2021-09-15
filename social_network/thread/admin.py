from django.contrib import admin
from thread.models import Thread, Message, MessegePhoto

admin.site.register(Thread)
admin.site.register(Message)
admin.site.register(MessegePhoto)
