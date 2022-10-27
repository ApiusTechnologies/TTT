import os

from channels.auth import AuthMiddlewareStack
from channels.routing import URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import re_path
from api.consumers import NewsConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

http_application = get_asgi_application()
ws_application = AllowedHostsOriginValidator(
    AuthMiddlewareStack(URLRouter([
        re_path(r"ws/news", NewsConsumer.as_asgi())
    ])))
