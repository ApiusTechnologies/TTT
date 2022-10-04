from config.celery import app
from django.conf import settings
from parsers.feedburner_rss import FeedburnerRss
from parsers.twitter_parser import TwitterParser


@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    rss_frequency = 5 * 60.0        # 5 minutes
    sender.add_periodic_task(rss_frequency, parseRSS.s())
    twitter_frequency = 5 * 60.0    # 5 minutes
    sender.add_periodic_task(twitter_frequency, scrapTweets.s())


@app.task
def parseRSS(**kwargs):
    parser = FeedburnerRss(settings.RSS_SOURCE_LIST)
    parser.handleAll()


@app.task
def scrapTweets(**kwargs):
    parser = TwitterParser(settings.TWITTER_SOURCE_LIST)
    parser.handleAll()
