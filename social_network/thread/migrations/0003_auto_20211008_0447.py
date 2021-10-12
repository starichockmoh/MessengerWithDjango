# Generated by Django 3.2.7 on 2021-10-08 00:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('thread', '0002_thread_date_of_last_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='read',
            field=models.BooleanField(default=False, verbose_name='Прочитаное сообщение'),
        ),
        migrations.AlterField(
            model_name='messegephoto',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_photos', to=settings.AUTH_USER_MODEL),
        ),
    ]