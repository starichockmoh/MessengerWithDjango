from django.db import models
from account.models import AdvUser


class Thread(models.Model):
    push_notification = models.ManyToManyField(AdvUser, related_name='push_notification', blank=True)
    archive = models.ManyToManyField(AdvUser, related_name='archive', blank=True, null=True)
    participants = models.ManyToManyField(AdvUser)
    deleted = models.ManyToManyField(AdvUser, related_name='deleted', blank=True)

    def get_images(self):
        return self.messegephoto_set.all()

    def get_messeges(self):
        return self.message_set.all()

    class Meta:
        verbose_name_plural = 'Диалог'
        verbose_name = 'Диалоги'


class Message(models.Model):
    text = models.TextField()
    sender = models.ForeignKey(AdvUser, on_delete=models.CASCADE, related_name='sender_message')
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)
    who_deleted_the_message = models.ManyToManyField(AdvUser, related_name='who_deleted_the_message')

    def get_images(self):
        return self.messegephoto_set.all()

    class Meta:
        verbose_name_plural = 'Сообщение'
        verbose_name = 'Сообщения'


class MessegePhoto(models.Model):
    image = models.ImageField(upload_to='images/', verbose_name='Фотография сообщения')
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    sender = models.ForeignKey(AdvUser, on_delete=models.CASCADE, related_name='sender')

    class Meta:
        verbose_name_plural = 'Фотография сообщения'
        verbose_name = 'Фотографии сообщений'
