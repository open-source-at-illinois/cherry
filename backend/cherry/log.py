from cherry import app
from cherry.models.user_preferences import UserPreferences

import json
from os import path
from os import mkdir
from datetime import datetime as dt

from flask import request
from flask.wrappers import Response
from pydantic import ValidationError


class LogUtil:
    # format pydantic errors
    def format_error(self, error_log):
        errors = {"errors": []}
        for e in error_log:
            errors["errors"].append(f"{e['loc'][0]} {e['msg']}")
        return errors

    # store data in txt filename for logging
    def store_data(self, data):
        try:
            prefs = UserPreferences(**data)
        except ValidationError as e:
            return e.errors()

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
                content = "gpa,rmp,requirements,created_at\n"
                f.write(content)

        with open(REL_PATH, "a") as f:
            military_now = dt.now().strftime("%H:%M:%S")
            data = f"{prefs.gpa},{prefs.rmp},{prefs.requirements},{military_now}\n"
            f.write(data)

        return [prefs.dict()]


@app.route("/log", methods=["POST"])
def log():
    """
    Logging of requests/client-side inputs
    """
    data = request.json
    util = LogUtil()

    mimetype = "application/json"
    res = util.store_data(data)  # res = prefs if success, else error_log

    if "type" in res[0]:  # error_log
        res = util.format_error(res)
        status_code = 400
    else:
        status_code = 200

    return Response(response=json.dumps(res), status=status_code,
                    mimetype=mimetype)
