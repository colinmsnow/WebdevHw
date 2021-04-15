from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin
    
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# app.config['CORS_HEADERS'] = 'Content-Type'
# cors = CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app)

# # we need this or else it shuts down post requests
@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response     

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   return response


@app.route('/')
def index():
    return render_template('index.html', flask_token="Hello world")

@socketio.on("FromAPI")
def handle_message(data):
    print('received message: ' + data)

# @socketio.event
# def my_event(message):
#     emit('my response', {'data': 'got it!'})

def some_function():
    socketio.emit('some event', {'data': 42})

@socketio.on('connect')
def test_connect():
    print("CONNECTED")
    emit('my response', {'data': 'Connected'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
    # app.run()