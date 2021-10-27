from cherry import app


@app.route("/status")
def status():
    """
    Backend status
    """
    return {"online": True}
