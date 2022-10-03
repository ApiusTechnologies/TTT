
import tweepy
import logging
from datetime import datetime, timedelta
from django.conf import settings
from parsers.abstract_parser import AbstractParser
from api.models import News, Tag


class TwitterParser(AbstractParser):
    logger = logging.getLogger(__name__)

    def __init__(self, sources):
        if settings.TWITTER_BEARER_TOKEN is None:
            self.twitter_client = None
            self.logger.warning(
                "Twitter authentication not provided. Twitter source will not be active")
            return
        self.sources = sources
        self.twitter_client = tweepy.Client(settings.TWITTER_BEARER_TOKEN)

    def handleAll(self):
        for source in self.sources:
            self._handle(source["id"], source["name"])

    def _handle(self, id, name):
        if self.twitter_client is None:
            self.logger.warning("Twitter not enabled, skipping...")
            return
        twitter_filter = News.objects.filter(source__contains=f'Twitter{name}')
        if (twitter_filter.count() == 0):
            startTime = (datetime.now() - timedelta(days=21)
                         ).strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            startTime = twitter_filter[0].date.isoformat().replace(
                '+00:00', 'Z')

        tweets = tweepy.Paginator(
            self.twitter_client.get_users_tweets,
            id,
            tweet_fields=['created_at'],
            max_results=100,
            limit=500,
            start_time=startTime,
            exclude=['replies']
        ).flatten(limit=500)

        for tweet in tweets:
            title = f'From Twitter of {name}'
            summary = tweet.text
            href = f'https://twitter.com/twitter/status/{tweet.id}'
            news, news_created = News.objects.get_or_create(
                title=title, summary=summary, source=name, href=href, date=tweet.created_at)
            if (news_created):
                tagOrange, _ = Tag.objects.get_or_create(name=name)
                tagTwitter, _ = Tag.objects.get_or_create(name='Twitter')
                news.tags.add(tagOrange)
                news.tags.add(tagTwitter)
