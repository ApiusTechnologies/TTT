import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class NewsConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)("news", self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(
            self.channel_layer.group_discard)(
            "news", self.channel_name)

    def news_notify(self, event):
        content = event['content']
        self.send(text_data=json.dumps(content))
