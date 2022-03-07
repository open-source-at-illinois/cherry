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

def parse_courses(page, geneds, depts, query):
    if len(geneds) == 0:
        pass

    # sort courses by descending GPA
    try:
        course_list = course_data[['Course Name', 'GPA', 'Course Number', 'geneds', 'dept']]

        for gened in geneds:
            course_list = course_list[course_list['geneds'].apply(lambda x: gened in x)]

        if query and len(query):
            course_list = course_list[course_list['Course Name'].apply(lambda x: query.lower() in x.lower())]

        if depts:
            course_list = course_list[course_list['dept'].apply(lambda x: x in depts)]


        course_list = course_list.sort_values(by=['GPA'], ascending=False)

        total = len(course_list)

        course_list = course_list.iloc[int(page)*100:int(page)*100+100]
        return (total, course_list.to_json(orient='records'))
    except KeyError:
        return (0, [])


@app.route("/", defaults={'year': "2021", "term": "spring", 'page': "0"})
@app.route("/<year>/<term>", defaults={'page': "0"})
@app.route("/<year>/<term>/<page>")
def query(year, term, page):
    geneds_params = request.args.get('geneds')
    dept_params = request.args.get('depts')
    query_params = request.args.get('query')

    if geneds_params:
        geneds = geneds_params.split(",")
    else:
        geneds = []
    if dept_params:
        depts = dept_params.split(",")
    else:
        depts = []

    if query_params:
        query = str(query_params)
    else:
        query = ""

    total, courses = parse_courses(page, geneds, depts, query)

    return jsonify(
        {
            "total": total,
            "courses": courses
        }
    )
