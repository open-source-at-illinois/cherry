from cherry import app


@app.route("/log", methods=["POST"])
def log():
    """
    Logging of requests/client-side inputs
    """
    raise NotImplementedError
