from flask import Flask
from cherry import database

db = database.load_db()

app = Flask(__name__)
