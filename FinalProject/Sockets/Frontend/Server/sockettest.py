from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin
import database as db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app)

db = db.Database()
db.setup()


# # we need this or else it shuts down post requests
@app.after_request
def add_header(response):
    # response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers['Access-Control-Allow-Headers'] = '*'
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
def handcle_message(data):
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

    new_chat(sendingUser, receivingUser)
        returns: the new chat

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

    emit("create_user", "success")




@socketio.on('get_user')
def get_user(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    user_info = {"success":"success", "username": "A user", "password": "*********", "first_name": "joseph", "name": "joseph joe"}
    emit("user", user_info)

    # DATABASE: get the user by username

    # emit("get_user", json.dumps(username, name, password), broadcast=true)


# @socketio.on('new_chat')
# def new_chat(data):
#     # Create a new empty chat and add it to the list of chats. Return chats
#     try:
#         username = data["username"]
#         other_user = data["other_user"]
#     except KeyError:
#         emit('Error', broadcast=True)
#         return

#     # user_info = {"success":"success", "username": "A user", "password": "*********", "first_name": "joseph", "last_name": "joe"}
#     response = {"success":"success", "chats": [{"username":"maia", "name": "Maia Materman", "last_time": "10:05 PM", "first_name":"Maia", "message":"blah blah blah blah blah blah blah blah blah"}, {"username":"colin", "name": "Colin Snow", "last_time": "10:05 PM", "first_name":"Colin", "message":"This is a message"}, {"username":"shirin", "name": "Shirin Kuppusamy", "last_time": "null", "first_name":"null", "message":"null"}], "messages": []}



    # emit("chats", response)


@socketio.on('update_username')
def update_username(data):
    #checks if current user exists -- doesn't exist, returns error
    #does exist, checks if new_username exists -- does exists, returns error
    #doesn't exist, changes current username to new username
    try:
        username = data["username"]
        new_username = data["newname"]
    except KeyError:
        emit('Error', "Invalid key in username")
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
        new_password = data["newpassword"]
    except KeyError:
        emit('Error', "invalid key in update_password")
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
def update_firstname(data):
    try:
        username = data["username"]
        firstname = data["newname"]
    except KeyError:
        emit('Error', "invalid key in update_name")
        return

    
    print("Updating to new firstname: " + str(name))

    # DATABASE: replace name of user with new name



    # DATABASE: replace name of user with new name

@socketio.on('update_name')
def update_name(data):
    try:
        username = data["username"]
        name = data["newname"]
    except KeyError:
        emit('Error', "invalid key in update_name")
        return

    print("Updating to new name: " + str(name))

    # DATABASE: replace name of user with new name

@socketio.on('delete_account')
def delete_account(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', "invalid key in delete_account")
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
    # This function gets all info needed to display the chat page
    # Should return a response with a success value, list of chats
    # if other user is not in the database then create an empty chat and return chats
    try:
        username = data["username"]
        other_user = data["other_user"]
    except KeyError:
        emit('Error', "invalid key in get_chats")
        return

    print("Other user:")
    print(other_user)

    if other_user == "maia":
        response = {"success":"success", "other_user": "null","chats": [{"username":"maia", "name": "Maia Materman", "last_time": "10:05 PM", "first_name":"Maia", "message":"blah blah blah blah blah blah blah blah blah"}, {"username":"colin", "name": "Colin Snow", "last_time": "10:05 PM", "first_name":"Colin", "message":"This is a message"}]}
    
    elif other_user == "colin":
        response = {"success":"success", "other_user": "null","chats": [{"username":"maia", "name": "Maia Materman", "last_time": "10:05 PM", "first_name":"Maia", "message":"blah blah blah blah blah blah blah blah blah"}, {"username":"colin", "name": "Colin Snow", "last_time": "10:05 PM", "first_name":"Colin", "message":"This is a message"}]}

    elif other_user == "null":
        response = {"success":"success", "other_user": "null","chats": [{"username":"maia", "name": "Maia Materman", "last_time": "10:05 PM", "first_name":"Maia", "message":"blah blah blah blah blah blah blah blah blah"}, {"username":"colin", "name": "Colin Snow", "last_time": "10:05 PM", "first_name":"Colin", "message":"This is a message"}]}

    else: 
        response = {"success":"success", "other_user": other_user, "chats": [{"username":"maia", "name": "Maia Materman", "last_time": "10:05 PM", "first_name":"Maia", "message":"blah blah blah blah blah blah blah blah blah"}, {"username":"colin", "name": "Colin Snow", "last_time": "10:05 PM", "first_name":"Colin", "message":"This is a message"}, {"username":"shirin", "name": "Shirin Kuppusamy", "last_time": "null", "first_name":"null", "message":"null"}]}




    emit("chats", response)

    # DATABASE: get all messages to the user and find only the last one
        # from each person

    # chats = chats_from_database

    # emit("get_chats", json.dumps(chats), broadcast=true)


@socketio.on('get_messages')
def get_messages(data):
    try:
        username = data["username"]
        other_user = data["other_user"]
    except KeyError:
        emit('Error', "Invalid keys in get_messages")
        return

    print("Get messages other user:")
    print(other_user)

    if other_user == "maia":
        response = {"success":"success", "other_user": "maia","messages": [{"message":"hiiiiiiiiiiiiiiii", "time": "9:15 AM", "from": "hello"},{"message":"hey, what? Hello", "time": "10:08 AM", "from": "maia"},{"message":"not too bad myself", "time": "10:12 AM", "from": "hello"}]}
    
    elif other_user == "colin":
        response = {"success":"success", "other_user": "colin","messages": [{"message":"hiiii", "time": "9:15 AM", "from": "hello"},{"message":"hey, what?", "time": "10:08 AM", "from": "colin"},{"message":"not too bad", "time": "10:12 AM", "from": "hello"}]}

    else:
        response = {"success":"success", "other_user": other_user,"messages": []}


    print("Sending message back from get_messages")



    emit("messages", response)



    # DATABASE: get all messages between users 1 and 2
        # from each person

    # messages = messages_from_database

    # emit("get_messages", json.dumps(messages), broadcast=true)



@socketio.on('send_message')
def send_message(data):
    try:
        username = data["username"]
        other_user = data["other_user"]
        content = data["content"]
    except KeyError:
        emit('Error', "invalid key in send_message")
        return

    print("got a new message")
    print(data)

    # add it to the database



    # send a message to all clients saying there is a new message and asking to reload
    emit("new_message", broadcast=True)



    # DATABASE: add a message from 1 to 2

    # TODO: Find a way to update person 2 if they are online when this happens


if __name__ == '__main__':
    socketio.run(app, debug=True)
    # app.run()
