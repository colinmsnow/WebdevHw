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
        name = data["name"]
        username = data["username"]
        password = data["password"]
        confirm_password = data["confirm_password"]
    except KeyError:
        emit("Error","Fields are missing in create_user")
        return
    
    if (password != confirm_password):
        emit("Error","Passwords do not match")
        return


    new_user = db.create_user(username,firstname,name,password)

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

    if(db.get_user(username)):
        password,first_name,name = db.get_user_info(username)
        user_info = {"success":"success", "username": username, "password": password, "first_name": first_name , "name": name}
        emit("user", user_info)
    else:
        emit('Error',"this user doesn't exist")

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
        new_firstname = data["newname"]
    except KeyError:
        emit('Error', "invalid key in update_name")
        return

    if (not db.get_user(username)):
        emit('update_firstname','failure')
        emit('Error',"This user does not exist.")
        return

    db.update_firstname(username,new_firstname)
    emit('update_firstname','success')


@socketio.on('update_name')
def update_name(data):
    try:
        username = data["username"]
        new_name = data["newname"]
    except KeyError:
        emit('Error', "invalid key in update_name")
        return

    if (not db.get_user(username)):
        emit('update_name','failure')
        emit('Error',"This user does not exist.")
        return

    db.update_name(username,new_name)
    emit('update_name','success')

@socketio.on('delete_account')
def delete_account(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', "invalid key in delete_account")
        return

    #check if user exists
    if (not db.get_user(username)):
        emit('delete_account','failure')
        emit('Error',"This user does not exist.")
        return

    # DATABASE: delete row with that username
    db.delete_account(username)
    emit('delete_account','success')

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
        emit('login_response',username)
    else:
        emit('login_response','failure')
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

    # print("User:")
    # print(username)
    # print("Other user:")
    # print(other_user)

    uname,name,timestamp,firstname,message = db.get_chats(username)
    print(uname)
    print(name)
    print(firstname)
    print(message)

    chats = []   
    for i in range(len(uname)):
        chats.append({"username":uname[i], "name": name[i], "last_time": timestamp[i].strftime("%H:%M:%S"), "first_name": firstname[i], "message":message[i]})

    response = {"success":"success", "other_user": "null","chats": chats}

    print(response)

    emit("chats", response)



@socketio.on('get_messages')
def get_messages(data):
    try:
        username = data["username"]
        other_user = data["other_user"]
    except KeyError:
        emit('Error', "Invalid keys in get_messages")
        return

    # print("User:")
    # print(username)
    # print("Get messages other user:")
    # print(other_user)


    message,timestamp,from_user = db.get_messages(username,other_user)
    # print(message)
    # print(from_user)
    messages = []
    for i in range(len(message)):
        print(i)
        messages.append({"message":message[i],"time":timestamp[i].strftime("%H:%M:%S"),"from":from_user[i]})

    response = {"success":"success", "other_user": other_user,"messages": messages} 
    
    emit("messages", response)


@socketio.on('send_message')
def send_message(data):
    try:
        username = data["username"]
        other_user = data["other_user"]
        content = data["content"]
    except KeyError:
        emit('Error', "invalid key in send_message")
        return


    if (not db.get_user(other_user)):
        emit('Error',"This user does not exist. Please ask them to make an account.")
        return

    db.send_message(username,other_user,content)

    get_chats(data)
    get_messages(data)

    emit("new_message",{"other_user": other_user},broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True)
    # app.run()
