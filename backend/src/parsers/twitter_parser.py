
import tweepy
import time
from datetime import datetime, timedelta
from api.models import News, Tag
from django.conf import settings


class TwitterParser:

    def __init__(self, user_id, user_name):
        self.user_id = user_id
        self.user_name = user_name
        self.twitter_client = tweepy.Client(settings.TWITTER_BEARER_TOKEN)

    def handle(self):
        twitter_filter = News.objects.filter(source__contains=f'Twitter{self.user_name}')
        if(twitter_filter.count() == 0):
            startTime =  (datetime.now()-timedelta(days=21)).strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            startTime = twitter_filter[0].date.isoformat().replace('+00:00', 'Z')

        tweets = tweepy.Paginator(
            self.twitter_client.get_users_tweets,
            self.user_id,
            tweet_fields=['created_at'],
            max_results=100,
            limit=500,
            start_time=startTime,
            exclude=['replies']
        ).flatten(limit=500)

        for tweet in tweets:
            title = f'From Twitter of {self.user_name}'
            summary = tweet.text
            href = f'https://twitter.com/twitter/status/{tweet.id}'
            news, news_created = News.objects.get_or_create(
                title=title, summary=summary, source=f'Twitter{self.user_name}', href=href, date=tweet.created_at)
            if(news_created):
                tagOrange, _ = Tag.objects.get_or_create(name=self.user_name)
                tagTwitter, _ = Tag.objects.get_or_create(name='Twitter')
                news.tags.add(tagOrange)
                news.tags.add(tagTwitter)
