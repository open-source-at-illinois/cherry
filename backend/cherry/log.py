from cherry import app

import json
from os import path
from os import mkdir
from datetime import datetime as dt
from flask import request, Response


class LogUtil:
    # store data in txt filename for logging
    def store_data(self, data):
        today = dt.today()
        DIR_NAME = "logs"
        BASE_DIR = path.dirname(__file__)
        DIR_PATH = path.join(BASE_DIR, DIR_NAME)
        FILENAME = f"{today.month}-{today.day}-{today.year}.log"
        REL_PATH = path.join(DIR_PATH, FILENAME)

        if not path.isdir(DIR_PATH):
            mkdir(DIR_PATH)
        if not path.exists(REL_PATH):
            with open(REL_PATH, "a") as f:
                content = "gpa,requirements,created_at\n"
                f.write(content)

        with open(REL_PATH, "a") as f:
            gpa = data["gpa"]
            requirements = data["requirements"]
            military_now = dt.now().strftime("%H:%M:%S")
            data = f"{gpa},{requirements},{military_now}\n"
            f.write(data)

    # make sure all user properties exist in data
    def is_valid(self, data):
        if data is None:
            return False
        properties = ["gpa", "requirements"]
        for p in properties:
            if p not in data:
                return False
        return True


@app.route("/log", methods=["POST"])
def log():
    """
    Logging of requests/client-side inputs
    """
    data = request.json
    util = LogUtil()

    mimetype = "application/json"
    if not util.is_valid(data):
        response = {"message": "Data invalid."}
        status_code = 400
    else:
        util.store_data(data)

        response = {"message": "Log stored."}
        status_code = 200

    return Response(response=json.dumps(response), status=status_code,
                    mimetype=mimetype)
