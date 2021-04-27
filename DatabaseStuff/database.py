from getpass import getpass
import mysql.connector as mc

#logs in to server
mydb = mc.connect(
    host="localhost",
    user=input("Enter username: "),
    password=getpass("Enter password: "),
    )
print(mydb)

#creates cursor and sets up database & tables if they don't exist 
mycursor = mydb.cursor()
mycursor.execute("CREATE DATABASE IF NOT EXISTS Chats")
mycursor.execute("CREATE DATABASE IF NOT EXISTS Chats")
mycursor.execute("USE Chats")
mycursor.execute("CREATE TABLE IF NOT EXISTS Users (id INT unsigned NOT NULL AUTO_INCREMENT, firstName VARCHAR(150) NOT NULL, lastName VARCHAR(150) NOT NULL, password VARCHAR(150) NOT NULL, picture JSON, PRIMARY KEY (id))") 
mycursor.execute("CREATE TABLE IF NOT EXISTS Messages (fromUser VARCHAR(150) NOT NULL, toUser VARCHAR(150) NOT NULL, seqNum INT unsigned NOT NULL AUTO_INCREMENT, unread TINYINT NOT NULL, content VARCHAR(500) NOT NULL, timestamp TIMESTAMP, INDEX(seqNum),PRIMARY KEY (fromUser,toUser,seqNum))") 


