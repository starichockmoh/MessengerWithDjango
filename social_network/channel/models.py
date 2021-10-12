from django.db import models
from account.models import AdvUser


class Channel(models.Model):
    """ Каналы месенжера """
    title = models.CharField(max_length=10, verbose_name='Название канала')
    participents = models.ManyToManyField(AdvUser, related_name='participents', blank=True, verbose_name='Пользователи канала')
    avatar = models.ImageField(upload_to='images/', default='images/profile.png')
    description = models.TextField(max_length=300, blank=True, null=True, verbose_name='Описание канала')
    admins = models.ManyToManyField(AdvUser, related_name='admins', verbose_name='Администраторы канала')
    creator = models.ForeignKey(AdvUser, on_delete=models.CASCADE, related_name='creator', blank=True, null=True)

    def get_posts(self):
        return self.post_set.all()

    class Meta:
        db_table = 'channel'
        verbose_name_plural = 'Канал'
        verbose_name = 'Каналы'


class Post(models.Model):
    """ Публикации каналов """
    text = models.TextField(max_length=500, verbose_name='Текст поста')
    views = models.IntegerField(default=0, verbose_name='Кол-во просмотров')
    datetime = models.DateTimeField(auto_now_add=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    def get_image_post(self):
        return self.image_post_set.all()

    def get_video_post(self):
        return self.video_post_set.all()

    def get_comments(self):
        return self.comment_set.all()

    class Meta:
        db_table = 'post'
        verbose_name_plural = 'Пост канала'
        verbose_name = 'Посты каналов'


class ImagePost(models.Model):
    """ Фотографии, которые прикрепляются к постам """
    image = models.ImageField(upload_to='images/', verbose_name='Фотография поста')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name='Пост', related_name='addit_image')
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, null=True, blank=True)
    sender = models.ForeignKey(AdvUser, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        db_table = 'image_post'
        verbose_name_plural = 'Фотография поста'
        verbose_name = 'Фотографии постов'


class VideoPost(models.Model):
    """ Видео, которые прикрепляются к постам """
    image = models.ImageField(upload_to='videos/', verbose_name='Видио поста')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name='Пост')

    class Meta:
        db_table = 'video_post'
        verbose_name_plural = 'Видио поста'
        verbose_name = 'Видио постов'


class Comment(models.Model):
    """ Коментарии постов """
    author = models.ForeignKey(AdvUser, on_delete=models.CASCADE, verbose_name='Автор коментария')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name='Пост коментария')
    text = models.TextField(max_length=1000, verbose_name='Текст коментария')
    datetime = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'comment'
        verbose_name_plural = 'Коментарий поста'
        verbose_name = 'Коментарии постов'
