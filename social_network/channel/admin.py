from django.contrib import admin
from channel.models import Channel, Post, ImagePost, Comment

admin.site.register(Channel)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(ImagePost)
