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
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Users (id VARCHAR(150) NOT NULL, firstName VARCHAR(150) NOT NULL, lastName VARCHAR(150) NOT NULL, password VARCHAR(150) NOT NULL, PRIMARY KEY (id))") 
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

    def login(self,username):
        self.cursor.execute("USE Chats")
        self.cursor.execute("SELECT password FROM Users WHERE id=%s",(username,))
        self.db.commit()
        for x in self.cursor:
            password = x[0]
        return password

    def create_user(self,username, firstname, lastname, password):
        self.cursor.execute("USE Chats")
        already_exists = self.get_user(username)
        if (already_exists):
            return False
        else:
            self.cursor.execute("INSERT INTO Users (id,firstName,lastName,password) VALUES (%s,%s, %s, %s)", (username,firstname,lastname,password))
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
                return True, "success"
        else:
            return False, "This user does not exist."

    def update_password(self,username, new_password):
        self.cursor.execute("USE Chats")
        self.cursor.execute("UPDATE Users SET password=%s WHERE id=%s",(new_password,username))
        self.db.commit()

    def delete_account(self,username):
        self.cursor.execute("USE Chats")
        self.cursor.execute("DELETE FROM Users WHERE id=%s",(username,))
        self.db.commit()