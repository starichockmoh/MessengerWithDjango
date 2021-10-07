import json

from django.contrib.contenttypes.models import ContentType

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from thread.models import Message, Thread, MessegePhoto
from thread.views import get_current_user


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
        username = text_data_json['sender']
        # Функция которая зная кол-во фотографий затирает их в массив для дальнейшей отправки
        q = int(text_data_json['quantity'])
        images = []
        for i in range(q):
            images.add(text_data_json['image'+str(i)])
        #
        new_message = await self.create_new_message(message, username, images)
        # тест вариант по фотографиям
        images = json.dumps(new_message.addit_image.all())
        data = {
            'sender': new_message.sender.pk,
            'datetime': new_message.datetime.strftime('%Y-%m-%d %H:%m'),
            'text': new_message.text,
            'message_id': new_message.pk,
            # тест вариант по фотографиям
            'images': images
        }

        await self.channel_layer.group_send(
            self.post_group_name,
            {
                'type': 'new_message',
                'message': data
            }
        )

    async def new_message(self, event):
        message = event['message']

        await self.send(
            text_data=json.dumps({
                'message': message
            })
        )

    @database_sync_to_async
    def create_new_message(self, message, username, images):
        thread = Thread.objects.get(pk=self.thread_id)
        user = get_current_user(username)
        new_message = Message.objects.create(
            sender=user,
            text=message,
            thread=thread
        )
        thread.date_of_last_message = new_message.datetime
        thread.save()
        # Функция которая перебирает все фотографии и затирает их в бд
        for image in images:
            MessegePhoto.objects.create(
                image=image,
                thread=thread,
                message=new_message,
                sender=user
            )
        #
        return new_message
