from getpass import getpass
import mysql.connector as mc

class Database:

    def __init__(self):
        self.db = mc.connect(
            host="localhost",
            user="dbuser",
            password="1234",
            )
        self.cursor = self.db.cursor(buffered=True)

    def setup(self):
        #sets up database & tables if they don't exist 
        self.cursor.execute("CREATE DATABASE IF NOT EXISTS Chats")
        self.cursor.execute("USE Chats")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Users (id VARCHAR(150) NOT NULL, firstName VARCHAR(150) NOT NULL, name VARCHAR(150) NOT NULL, password VARCHAR(150) NOT NULL, PRIMARY KEY (id))") 
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Messages (fromUser VARCHAR(150) NOT NULL, toUser VARCHAR(150) NOT NULL, seqNum INT unsigned NOT NULL AUTO_INCREMENT, unread TINYINT NOT NULL, content VARCHAR(500) NOT NULL, timestamp TIMESTAMP, INDEX(seqNum),PRIMARY KEY (fromUser,toUser,seqNum))") 
        self.db.commit()

    def get_user(self,username):
        self.cursor.execute("USE Chats")
        self.cursor.execute("SELECT id FROM Users WHERE id=%s",(username,))
        user = ()
        for x in self.cursor:
            user = x[0]
        if (user == ()):
            return False
        return True
    
    def get_user_info(self,username):
        self.cursor.execute("USE Chats")
        self.cursor.execute("SELECT password FROM Users WHERE id=%s",(username,))
        for x in self.cursor:
            password = x[0]
        self.cursor.execute("SELECT firstName FROM Users WHERE id=%s",(username,))
        for x in self.cursor:
            firstname = x[0]
        self.cursor.execute("SELECT name FROM Users WHERE id=%s",(username,))
        for x in self.cursor:
            name = x[0]
        return password,firstname,name
        
    def login(self,username):
        self.cursor.execute("USE Chats")
        self.cursor.execute("SELECT password FROM Users WHERE id=%s",(username,))
        self.db.commit()
        for x in self.cursor:
            password = x[0]
        return password

    def create_user(self,username, firstname, name, password):
        self.cursor.execute("USE Chats")
        already_exists = self.get_user(username)
        if (already_exists):
            return False
        else:
            self.cursor.execute("INSERT INTO Users (id,firstName,name,password) VALUES (%s,%s, %s, %s)", (username,firstname,name,password))
            self.db.commit()
            return True

    def update_username(self,username, new_username):
        self.cursor.execute("USE Chats")
        user_exists = self.get_user(username)
        new_already_exists = self.get_user(new_username)
        if (user_exists):
            if (new_already_exists):
                return False, "Username already in use, please pick a different username."
            else:
                self.cursor.execute("UPDATE Users SET id=%s WHERE id=%s",(new_username,username))
                self.db.commit()
                self.cursor.execute("UPDATE Messages SET fromUser=%s WHERE fromUser=%s",(new_username,username))
                self.db.commit()
                self.cursor.execute("UPDATE Messages SET toUser=%s WHERE toUser=%s",(new_username,username))
                self.db.commit()
                return True, "success"
        else:
            return False, "This user does not exist."

    def update_password(self,username, new_password):
        self.cursor.execute("USE Chats")
        self.cursor.execute("UPDATE Users SET password=%s WHERE id=%s",(new_password,username))
        self.db.commit()

    def update_firstname(self,username, new_firstname):
        self.cursor.execute("USE Chats")
        self.cursor.execute("UPDATE Users SET firstName=%s WHERE id=%s",(new_firstname,username))
        self.db.commit()

    def update_name(self,username, new_name):
        self.cursor.execute("USE Chats")
        self.cursor.execute("UPDATE Users SET name=%s WHERE id=%s",(new_name,username))
        self.db.commit()

    def delete_account(self,username):
        self.cursor.execute("USE Chats")
        self.cursor.execute("DELETE FROM Users WHERE id=%s",(username,))
        self.db.commit()
        self.cursor.execute("DELETE FROM Messages WHERE fromUser=%s OR toUser=%s",(username,username))
        self.db.commit()
    
    def get_chats(self,username):
        uname = []
        uname2 = []
        name = []
        timestamp = []
        firstname = []
        message = []
        self.cursor.execute("USE Chats")
        
        self.cursor.execute("SELECT DISTINCT toUser FROM Messages WHERE fromUser = %s",(username,))
        for x in self.cursor:
            uname.append(x[0])

        self.cursor.execute("SELECT DISTINCT fromUser FROM Messages WHERE toUser = %s",(username,))
        for x in self.cursor:
            if x[0] not in uname:
                uname.append(x[0])

        for un in uname:
            self.cursor.execute("SELECT content FROM Messages WHERE (fromUser = %s AND toUser = %s) OR (fromUser = %s AND toUser = %s) ORDER BY seqNum DESC LIMIT 1",(un,username,username,un))
            for x in self.cursor:
                message.append(x[0])
        
        for un in uname:
            self.cursor.execute("SELECT timestamp FROM Messages WHERE (fromUser = %s AND toUser = %s) OR (fromUser = %s AND toUser = %s)  ORDER BY seqNum DESC LIMIT 1",(un,username,username,un))
            for x in self.cursor:
                timestamp.append(x[0])   

        for un in uname:
            self.cursor.execute("SELECT name FROM Users WHERE id = %s",(un,))
            for x in self.cursor:
                name.append(x[0])

        for un in uname:
            self.cursor.execute("SELECT firstName FROM Users WHERE id = %s",(un,))
            for x in self.cursor:
                firstname.append(x[0])
        
        return uname,name,timestamp,firstname,message

    def get_messages(self,username,other_user):
        message = []
        timestamp = []
        from_user = []

        self.cursor.execute("USE Chats")
        self.cursor.execute("SELECT content FROM Messages WHERE fromUser = %s AND toUser = %s OR fromUser = %s AND toUser = %s ORDER BY seqNum DESC",(username,other_user,other_user,username))
        for x in self.cursor:
            message.append(x[0])

        self.cursor.execute("SELECT timestamp FROM Messages WHERE fromUser = %s AND toUser = %s OR fromUser = %s AND toUser = %s ORDER BY seqNum DESC",(username,other_user,other_user,username))
        for x in self.cursor:
            timestamp.append(x[0])

        self.cursor.execute("SELECT fromUser FROM Messages WHERE fromUser = %s AND toUser = %s OR fromUser = %s AND toUser = %s ORDER BY seqNum DESC",(username,other_user,other_user,username))
        for x in self.cursor:
            from_user.append(x[0])

        return message,timestamp,from_user
        
    def send_message(self,username, other_user, content):
        self.cursor.execute("USE Chats")
        self.cursor.execute("INSERT INTO Messages (fromUser,toUser,unread,content) VALUES (%s,%s, 1, %s)", (username,other_user,content))
        self.db.commit()
        