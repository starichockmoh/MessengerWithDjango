from django.db import models
from django.utils.timezone import localtime

from account.models import AdvUser


class Thread(models.Model):
    push_notification = models.ManyToManyField(AdvUser, related_name='push_notification', blank=True)
    archive = models.ManyToManyField(AdvUser, related_name='archive', blank=True, null=True)
    participants = models.ManyToManyField(AdvUser)
    deleted = models.ManyToManyField(AdvUser, related_name='deleted', blank=True)
    date_of_last_message = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def get_images(self):
        return self.messegephoto_set.all()

    def get_messages(self):
        return self.message_set.all()

    def last_message(self):
        return self.get_messages().all().order_by("-datetime")[0]

    class Meta:
        verbose_name_plural = 'Диалог'
        verbose_name = 'Диалоги'


class Message(models.Model):
    text = models.TextField()
    sender = models.ForeignKey(AdvUser, on_delete=models.CASCADE, related_name='sender_message')
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)
    who_deleted_the_message = models.ManyToManyField(AdvUser, related_name='who_deleted_the_message')
    read = models.BooleanField(default=False, verbose_name='Прочитаное сообщение')

    def get_images(self):
        return self.messegephoto_set.all()

    def __str__(self):
        return self.text

    class Meta:
        verbose_name_plural = 'Сообщение'
        verbose_name = 'Сообщения'


class MessegePhoto(models.Model):
    image = models.ImageField(upload_to='images/', verbose_name='Фотография сообщения')
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    sender = models.ForeignKey(AdvUser, on_delete=models.CASCADE, related_name='message_photos')

    class Meta:
        verbose_name_plural = 'Фотография сообщения'
        verbose_name = 'Фотографии сообщений'
