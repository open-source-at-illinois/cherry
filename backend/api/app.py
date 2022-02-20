from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite+pysqlite:///build/cherry.db"
db = SQLAlchemy(app)
CORS(app)
