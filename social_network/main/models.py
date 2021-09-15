from django.db import models
from django.contrib.auth.models import AbstractUser


class AdvUser(AbstractUser):
    friends = models.ManyToManyField("self", null=True, verbose_name="Друзья")
    is_online = models.BooleanField(default=False, verbose_name="Онлайн")
    last_active = models.DateTimeField(null=True, verbose_name="Последнее посещение сайта")
    telephone = models.CharField(max_length=12, blank=True)
    about_user = models.TextField(max_length=100, blank=True, verbose_name='Информация о пользователе')

    def get_threads(self):
        return self.thread_set.all()

    def get_channels(self):
        return self.channel_set.all()

    def get_add_photos(self):
        return self.additionalimageprofile_set.all()

    class Meta(AbstractUser.Meta):
        pass


class AvatarImageProfile(models.Model):
    image = models.ImageField(upload_to='images/', verbose_name='Фотография пользователя')
    user = models.ForeignKey(AdvUser, on_delete=models.CASCADE, verbose_name='Пользователь')

    class Meta:
        verbose_name_plural = 'Фотография пользхователя'
        verbose_name = 'Фотографии пользователей'



