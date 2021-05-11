from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin
import database as db
import hashlib

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

@app.route('/')
def index():
    return render_template('index.html', flask_token="Hello world")

@socketio.on("FromFrontend")
def handcle_message(data):
    print('received message: ' + data)

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
        returns: (username, name, password)

    update_username(username, new_username):
        returns: nothing or error
    
    update_password(username, newPassword):
        returns: nothing or error

    update_name(username, new_name):
        returns: nothing or error

    delete_account(username):
        returns: nothing or error
    
    login(user, password)
        returns: success/failure

    get_chats(username)
        returns: Array of chats that the user is in with last message
            [(toUser, userProfile, lastMessage, timestamp), (), ...]

    get_messages(user1, user2)
        returns: Array of messages in descending order
            [(from, messageText, timestamp), (), ...]

    send_message(sendingUser, receivingUser, content)
        returns: nothing or error

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
        emit("Error",{"message" : "Fields are missing in create_user", "show" : "false"})
        return
    
    if (password != confirm_password):
        emit("Error",{"message" : "Passwords do not match", "show" : "true"})
        return

    password = hashlib.md5(bytes(password,'utf-8'))
    password = password.hexdigest()
    new_user = db.create_user(username,firstname,name,password)

    if(new_user):
        emit('new_user','success')
        return
    else:
        emit('new_user','failure')
        emit('Error', {"message" : "Username already exists, try another username", "show" : "true"})
        return

    emit("new_user", "success")




@socketio.on('get_user')
def get_user(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', broadcast=True)
        return

    if(db.get_user(username)):
        password,first_name,name = db.get_user_info(username)
        user_info = {"success":"success", "username": username, "password": '********', "first_name": first_name , "name": name}
        emit("user", user_info)
    else:
        emit('Error',{"message" : "this user doesn't exist", "show" : "true"})


@socketio.on('update_username')
def update_username(data):
    #checks if current user exists -- doesn't exist, returns error
    #does exist, checks if new_username exists -- does exists, returns error
    #doesn't exist, changes current username to new username
    try:
        username = data["username"]
        new_username = data["newname"]
    except KeyError:
        emit('Error', {"message" : "Invalid key in username", "show" : "false"})
        return

    works,message = db.update_username(username,new_username)

    if(works):
        emit('change_username',message)
    else:
        emit('change_username','failure')
        emit('Error', {"message" : message, "show" : "false"})



@socketio.on('update_password')
def update_password(data):
    try:
        username = data["username"]
        new_password = data["newpassword"]
    except KeyError:
        emit('Error', {"message" : "invalid key in update_password", "show" : "false"})
        return

    #check if user exists
    if (not db.get_user(username)):
        emit('change_password','failure')
        emit('Error',{"message" : "This user does not exist.", "show" : "false"})
        return

    new_password = hashlib.md5(bytes(new_password,'utf-8'))
    new_password = new_password.hexdigest()
    # DATABASE: replace password of user with new passowrd
    db.update_password(username,new_password)
    emit('change_password','success')


@socketio.on('update_firstname')
def update_firstname(data):
    try:
        username = data["username"]
        new_firstname = data["newname"]
    except KeyError:
        emit('Error', {"message" : "invalid key in update_name", "show" : "false"})
        return

    if (not db.get_user(username)):
        emit('change_firstname','failure')
        emit('Error',{"message" : "This user does not exist.", "show" : "false"})
        return

    db.update_firstname(username,new_firstname)
    emit('change_firstname','success')


@socketio.on('update_name')
def update_name(data):
    try:
        username = data["username"]
        new_name = data["newname"]
    except KeyError:
        emit('Error', {"message" : "invalid key in update_name", "show" : "false"})
        return

    if (not db.get_user(username)):
        emit('change_name','failure')
        emit('Error',{"message" : "This user does not exist.", "show" : "false"})
        return

    db.update_name(username,new_name)
    emit('change_name','success')

@socketio.on('delete_account')
def delete_account(data):
    try:
        username = data["username"]
    except KeyError:
        emit('Error', {"message" : "invalid key in delete_account", "show" : "false"})
        return

    #check if user exists
    if (not db.get_user(username)):
        emit('delete','failure')
        emit('Error',{"message" : "This user does not exist.", "show" : "false"})
        return

    # DATABASE: delete row with that username
    db.delete_account(username)
    emit('delete','success')

@socketio.on('login')
def login(data):
    try:
        username = data["username"]
        password = data["password"]
    except KeyError:
        emit('Error', {"message" : "Login fields missing", "show" : "true"})
        return
    
    #check if user exists
    if (not db.get_user(username)):
        emit('login_response','failure')
        emit('Error',{"message" : "This user does not exist.", "show" : "true"})
        return
        return

    password = hashlib.md5(bytes(password,'utf-8'))
    password = password.hexdigest()
    # DATABASE: get password from username
    correct_password = db.login(username)

    if(password == correct_password):
        emit('login_response',username)
    else:
        emit('login_response','failure')
        emit('Error', {"message" : "Incorrect password", "show" : "true"})


@socketio.on('get_chats')
def get_chats(data):
    # This function gets all info needed to display the chat page
    # Should return a response with a success value, list of chats
    # if other user is not in the database then create an empty chat and return chats
    try:
        username = data["username"]
        other_user = data["other_user"]
    except KeyError:
        emit('Error', {"message" : "invalid key in get_chats", "show" : "false"})
        return

    uname,name,timestamp,firstname,message = db.get_chats(username)

    
    chats = []   
    if uname != []:
        for i in range(len(uname)):
            chats.append({"username":uname[i], "name": name[i], "last_time": timestamp[i].strftime("%B %-d, %-I:%-M%p"), "first_name": firstname[i], "message":message[i]})

    response = {"success":"success", "other_user": "null","chats": chats}

    emit("chats", response)



@socketio.on('get_messages')
def get_messages(data):
    try:
        username = data["username"]
        other_user = data["other_user"]
    except KeyError:
        emit('Error', {"message" : "Invalid keys in get_messages", "show" : "false"})
        return

    message,timestamp,from_user = db.get_messages(username,other_user)

    messages = []
    if message != []:
        for i in range(len(message)):
            print(i)
            messages.append({"message":message[i],"time":timestamp[i].strftime("%B %-d, %-I:%-M%p"),"from":from_user[i]})

    response = {"success":"success", "other_user": other_user,"messages": messages} 
    
    emit("messages", response)


@socketio.on('send_message')
def send_message(data):
    try:
        username = data["username"]
        other_user = data["other_user"]
        content = data["content"]
    except KeyError:
        emit('Error', {"message" : "invalid key in send_message", "show" : "false"})
        return

    if (not db.get_user(other_user)):
        emit('Error',{"message" : "This user does not exist. Please ask them to make an account.", "show" : "false"})
        return

    db.send_message(username,other_user,content)

    get_chats(data)
    get_messages(data)

    emit("new_message",{"other_user": other_user},broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True)
