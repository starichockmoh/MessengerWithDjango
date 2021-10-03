import json

from django.contrib.contenttypes.models import ContentType

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from thread.models import Message, Thread


class MessageConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.thread_id = self.scope['url_route']['kwargs']['thread_id']
        self.post_group_name = 'thread_%s' % self.thread_id

        await self.channel_layer.group_add(
            self.post_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.post_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['text']

        new_message = await self.create_new_message(message)
        data = {
            'author': new_message.author.username,
            'created_at': new_message.created_at.strftime('%Y-%m-%d %H:%m'),
            'text': new_message.text
        }

        await self.channel_layer.group_send(
            self.post_group_name,
            {
                'type': 'new_comment',
                'message': data
            }
        )

    async def new_comment(self, event):
        message = event['message']

        await self.send(
            text_data=json.dumps({
                'message': message
            })
        )

    @database_sync_to_async
    def create_new_comment(self, text):
        thread = Thread.objects.get(pk=self.thread_id)
        new_comment = Message.objects.create(
            author=self.scope['user'],
            text=text,
            thread=thread
        )
        return new_message