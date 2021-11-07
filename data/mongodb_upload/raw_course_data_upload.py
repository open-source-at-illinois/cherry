import pymongo
from pymongo import MongoClient
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

# connecting to MongoDB database
print("Settint up MongoDB client...")
client = MongoClient(os.environ.get('connection_string'))
db = client['cherry']
collection = db['course_info']

# Loading in course data (change filepath to point to the data file location)
print("Reading course data...")
course_data = pd.read_csv("../course_data_extraction/all_course_data.csv")
# cleaning some fields
course_data["Location"] = course_data["Location"].fillna("UNKNOWN")
course_data["CourseNumber"] = course_data["CourseNumber"].apply(lambda s: s.replace(" ", "-"))

course_data_dict = course_data.to_dict("records")

# Uploading data to database
print("Inserting data into database...")
collection.insert_many(course_data_dict)
