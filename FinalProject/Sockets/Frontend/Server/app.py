from flask import (Flask, render_template)

app = Flask("__main__")

# we need this or else it shuts down post requests
@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response     

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello   world")

app.run(debug=True)