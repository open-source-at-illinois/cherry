import pymongo
from pydantic import BaseModel
from typing import Any, List
from dotenv import load_dotenv
import os

def load_db():
    load_dotenv()
    db = Database(os.environ.get('connection_string'))
    return db

class Database():
    def __init__(self, connection_string: str, database: str = "cherry"):
        self.client = pymongo.MongoClient(connection_string)[database]

    def __getitem__(self, collection: str) -> Any:
        return Collection(self.client[collection])

class Collection():
    def __init__(self, collection):
        self.collection = collection

    def all(self):
        """
        Returns an iterable of all the items in the collection
        """
        for x in self.collection.find():
            yield x

    def insert(self, object: BaseModel):
        """
        Insert a pydantic object into the collection
        """
        return self.collection.insert_one(dict(object))

    def insert_many(self, objects: List[BaseModel]):
        """
        Insert a list of pydantic objects into the collection
        """
        dict_obj = map(dict, objects)
        return self.collection.insert_many(dict_obj)

    def replace(self, object: BaseModel, upsert = False):
        """
        Replaces/updates a pydantic object in the collection
        """
        unique_attr = object["_unique_id"]
        return self.collection.replace_one({unique_attr: object[unique_attr]}, dict(object))

    def find(self, *args, **kwargs):
        """
        Finds an object in the collection
        """
        results =  self.collection.find(*args, **kwargs)
        for result in results:
            yield result

    def find_one(self, *args, **kwargs):
        """
        Finds an object in the collection
        """
        results = list(self.collection.find(*args, **kwargs))
        if len(results) == 1:
            return results[0]

        raise NameError
