from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin
import database as db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# app.config['CORS_HEADERS'] = 'Content-Type'
# cors = CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app)

db = db.Database()
db.setup()


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

@socketio.on("FromFrontend")
def handle_message(data):
    print('received message: ' + data)


# @socketio.event
# def my_event(message):
#     emit('my response', {'data': 'got it!'})

def some_function():
    socketio.emit('some event', "Hello")

@socketio.on('connect')
def test_connect():
    print("CONNECTED")
    emit('FromAPI', "Hello", broadcast=True)

""" Frontend routes we want:

    create_user(name, username, password)
        returns: nothing or error if already used

    get_user(username)
        returns: (username, name, password, picture)

    update_username(username, new_username):
        returns: nothing
    
    update_password(username, newPassword):
        returns: nothing

    update_name(username, new_name):
        returns: nothing

    update_picture(username, new_picture): Dont implement yet
        returns: nothing

    delete_account(username):
        returns: nothing
    
    login(user, password)
        returns: success/failure

    get_chats(username)
        returns: Array of chats that the user is in with last message
            [(toUser, userProfile, lastMessage, timestamp), (), ...]

    get_messages(user1, user2)
        returns: Array of messages in order
            [(from, messageText, timestamp), (), ...]

    send_message(sendingUser, receivingUser, content)
        returns: nothing

    new_message_incoming()
        returns: that there was a new message

"""
@socketio.on('create_user')
def create_user(data):
    try:
        firstname = data["name"]
        lastname = data["name"]
        username = data["username"]
        password = data["password"]
        confirm_password = data["confirm_password"]
    except KeyError:
        emit("Error","Fields are missing in create_user")
        return
    
    if (password != confirm_password):
        emit("Error","Passwords do not match")
        return


    new_user = db.create_user(username,firstname,lastname,password)

    if(new_user):
        emit('create_user','success')
        return
    else:
        emit('create_user','failure')
        emit('Error', "Username already exists, try another username")
        return


@socketio.on('get_user')
def get_user(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    # DATABASE: get the user by username

    # emit("get_user", json.dumps(username, name, password), broadcast=true)


@socketio.on('update_username')
def update_username(data):
    #checks if current user exists -- doesn't exist, returns error
    #does exist, checks if new_username exists -- does exists, returns error
    #doesn't exist, changes current username to new username
    try:
        username = data["username"]
        new_username = data["new_username"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    works,message = db.update_username(username,new_username)

    if(works):
        emit('update_username',message)
    else:
        emit('update_username','failure')
        emit('Error', message)


    # DATABASE: replace all instances of username with new username


@socketio.on('update_password')
def update_password(data):
    try:
        username = data["username"]
        password = data["password"]
        new_password = data["new_password"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    #check if user exists
    if (not db.get_user(username)):
        emit('update_password','failure')
        emit('Error',"This user does not exist.")
        return

    # DATABASE: replace password of user with new passowrd
    db.update_password(username,new_password)
    emit('update_password','success')


@socketio.on('update_firstname')
def update_Fisrtname(data):
    try:
        username = data["username"]
        firstname = data["firstname"]

    except KeyError:
        emit('Error', broadcast=True)
        return

    # DATABASE: replace name of user with new name

@socketio.on('update_lastname')
def update_Fisrtname(data):
    try:
        username = data["username"]
        lastname = data["lastname"]

    except KeyError:
        emit('Error', broadcast=True)
        return

    # DATABASE: replace name of user with new name

@socketio.on('delete_account')
def delete_account(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    #check if user exists
    if (not db.get_user(username)):
        emit('update_password','failure')
        emit('Error',"This user does not exist.")
        return

    # DATABASE: delete row with that username
    db.delete_account(username)

@socketio.on('login')
def login(data):
    try:
        username = data["username"]
        password = data["password"]
    except KeyError:
        emit('Error', "Login fields missing")
        return
    
    #check if user exists
    if (not db.get_user(username)):
        emit('login','failure')
        emit('Error',"This user does not exist.")
        return

    # DATABASE: get password from username
    correct_password = db.login(username)

    if(password == correct_password):
        emit('login','success')
    else:
        emit('login','failure')
        emit('Error', "Incorrect password")


@socketio.on('get_chats')
def get_chats(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    # DATABASE: get all messages to the user and find only the last one
        # from each person

    # chats = chats_from_database

    # emit("get_chats", json.dumps(chats), broadcast=true)


@socketio.on('get_messages')
def get_messages(data):
    try:
        user1 = data["user1"]
        user2 = data["user2"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    # DATABASE: get all messages between users 1 and 2
        # from each person

    # messages = messages_from_database

    # emit("get_messages", json.dumps(messages), broadcast=true)



@socketio.on('send_message')
def send_message(data):
    try:
        user1 = data["user1"]
        user2 = data["user2"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    # DATABASE: add a message from 1 to 2

    # TODO: Find a way to update person 2 if they are online when this happens


if __name__ == '__main__':
    socketio.run(app, debug=True)
    # app.run()
