from flask import Flask
from cherry import database

from dotenv import load_dotenv
import os

load_dotenv()

db = database.Database(os.environ.get('connection_string'))

app = Flask(__name__)
