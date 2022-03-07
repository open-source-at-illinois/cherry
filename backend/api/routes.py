# from dataclasses import dataclass
# from .app import app, db
# from flask import request, jsonify
# from .query import geneds_filter
# import pandas as pd

# courses = pd.read_csv('data/courses_2021_desc.csv')

# def parse_courses(page, geneds):
#     # filter courses based on geneds
#     def gened_check(geneds, course):
#         for gened in geneds:
#             if gened in course['geneds']:
#                 return True
#         return False    
#     # sort courses by descending GPA
#     courses = courses.sort_values(by='GPA', ascending=False)    
#     pass

# @app.route("/", defaults={'year': "2021", "term": "spring", 'page': "0"})
# @app.route("/<year>/<term>", defaults={'page': "0"})
# @app.route("/<year>/<term>/<page>")
# def query(year, term, page):
#     geneds_params = request.args.get('geneds')

#     if geneds_params:
#         geneds = geneds_params.split(",")
#     else:
#         geneds = []

#     total, courses = geneds_filter(db, int(year), str(term), geneds, page=int(page))

#     return jsonify(
#         {
#             "total": total,
#             "courses": list(courses)
#         }
#     )