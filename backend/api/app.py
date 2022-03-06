from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from dataclasses import dataclass
from flask import request, jsonify
# from .query import geneds_filter
import pandas as pd

course_data = pd.read_csv('./courses_2021_desc.csv')

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite+pysqlite:///build/cherry.db"
# db = SQLAlchemy(app)
CORS(app)


def parse_courses(page, geneds):
    # filter courses based on geneds
    # def gened_check(geneds, course):
    #     for gened in geneds:
    #         if gened in course['geneds']:
    #             return True
    #     return False
    # if geneds is not empty, filter courses
    if len(geneds) == 0:
        pass
    # sort courses by descending GPA
    course_list = course_data[['Course Name', 'GPA', 'Course Number', 'geneds']]
    course_list = course_list.sort_values(by=['GPA'], ascending=False)
    # paginate course list
    course_list = course_list.iloc[int(page)*100:int(page)*100+100]
    return (course_data.shape[0], course_list.to_dict(orient='records'))


@app.route("/", defaults={'year': "2021", "term": "spring", 'page': "0"})
@app.route("/<year>/<term>", defaults={'page': "0"})
@app.route("/<year>/<term>/<page>")
def query(year, term, page):
    geneds_params = request.args.get('geneds')

    if geneds_params:
        geneds = geneds_params.split(",")
    else:
        geneds = []

    total, courses = parse_courses(page, geneds)

    # print(courses)
    return jsonify(
        {
            "total": total,
            "courses": courses
        }
    )
