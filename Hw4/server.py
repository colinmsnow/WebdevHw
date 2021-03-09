from flask import Flask

app = Flask(__name__)

PORT = 8080

# Test route

@app.route('/test')
def test_route():
    # this will be interpreted by a browser as a (very) broken-down HTML doc
    return "Hello world"

app.run(port=PORT)
