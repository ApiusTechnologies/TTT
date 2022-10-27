from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .serializers import NewsSerializer
from .models import News, UserProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()


@receiver(post_save, sender=News)
def notify_news_creation(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        serializer = NewsSerializer(instance)
        async_to_sync(
            channel_layer.group_send)(
            "news", {
                "type": "news_notify",
                "content": serializer.data})
