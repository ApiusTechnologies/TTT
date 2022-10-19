from config.celery import app
from django.conf import settings
from parsers.feedburner_rss import FeedburnerRss
from parsers.twitter_parser import TwitterParser


@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    feedburner_frequency = 5 * 60.0        # 5 minutes
    sender.add_periodic_task(feedburner_frequency, handleFeedburner.s())
    twitter_frequency = 5 * 60.0    # 5 minutes
    sender.add_periodic_task(twitter_frequency, handleTwitter.s())


@app.task
def handleFeedburner(**kwargs):
    parser = FeedburnerRss()
    parser.handleAll()


@app.task
def handleTwitter(**kwargs):
    parser = TwitterParser()
    parser.handleAll()
