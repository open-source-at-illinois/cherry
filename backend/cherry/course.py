from cherry import app, db

@app.route("/course/<course_id>", methods=["GET"])
def course(course_id: str):
    return db["courses"].find_one({"course_id": course_id})
