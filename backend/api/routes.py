from .app import app, db
from flask import request, jsonify
from .query import geneds_filter

@app.route("/", defaults={'year': "2021", "term": "spring", 'page': "0"})
@app.route("/<year>/<term>", defaults={'page': "0"})
@app.route("/<year>/<term>/<page>")
def query(year, term, page):
    geneds_params = request.args.get('geneds')

    if geneds_params:
        geneds = geneds_params.split(",")
    else:
        geneds = []

    total, courses = geneds_filter(db, int(year), str(term), geneds, page=int(page))

    return jsonify(
        {
            "total": total,
            "courses": list(courses)
        }
    )