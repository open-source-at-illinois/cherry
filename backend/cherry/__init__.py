from flask import Flask
from cherry import database

db = database.load_db()

app = Flask(__name__)


@app.route("/hello", methods=["GET"])
def hello():
    return "Hello world!"
