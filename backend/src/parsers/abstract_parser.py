from abc import ABC, abstractmethod


class AbstractParser(ABC):

    def __init__(self, sources):
        self.sources = sources

    @abstractmethod
    def handleAll(self):
        pass

    @abstractmethod
    def _handle(self, *args):
        pass
