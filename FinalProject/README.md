![logo](https://github.com/colinmsnow/WebdevHw/blob/master/FinalProject/Brainstorming/logo.png "Logo for Chit Chat")

## Chit Chat is a chat app for synchronous chatting and communication among friends. 

For more information about this project, please see the [final presentation](https://docs.google.com/presentation/d/1Ir9iXyc3bBUrgabB1uxFhfBT7Qp4qMCr5gDDLabsLD0/edit?usp=sharing "Final Presentation Deck") our team gave for our final in Web Development in Spring 2021. 

### Set Up:

**Node**

If you don't have nodejs installed, [install the latest version](https://nodejs.org/en/download/ "Node Download"). If you don't know, write `node --version` in your terminal/command prompt. If you don't get a number, you don't have it.

**Flask**

  Install Python >= 3.9 and the following libraries:
  
    python-engineio==3.2.0
    python-socketio==4.0.0
    Flask==1.1.2
    Flask-Cors==3.0.10
    Flask-SocketIO==4.0.0
    eventlet==0.30.2
    Werkzeug==1.0.1
    urllib3==1.26.3
    requests==2.25.1

### Running the App: 

**Part 1: Create a mySQL Server:**

1. Install mySQL if you don't already have it installed. An installation guide is located at https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/installing.html \
For Ubuntu/Debian, you can either download the repo from the following link: https://dev.mysql.com/downloads/repo/apt/ or run the following command ```sudo apt-get install mysql-client mysql-server mysql-common```
2. Now, you will have to create a new server that doesn't use root. Follow the instructions at this link provided in Option 2 of the first answer:
https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost \
A few notes include, with the caveat that for the system user and password, you can also use any other name you would like, but be sure to change it accordingly in database.py (located in Socket/Frontend/Server): \
   * Instead of using 'YOUR_SYSTEM_USER' use 'dbuser' \
   * Instead of using 'YOUR_PASSWD' use '1234' \
   * Instead of using SET plugin='auth_socket' use SET plugin='mysql_native_password' \
3. In case, you run into any issues, here is a guide on how to uninstall and reinstall mySQL: https://www.cyberciti.biz/faq/linux-completely-reinstall-mysql-server/

**Part 2: Set Up the Frontend:**

1. ```cd Sockets/Frontend/frontend/src/components``` folder and then run ```npm install```
2. Once you have successfully installed npm, in the same folder, run ```npm run build```

**Part 3: Run the Actual Chat Server:**


1. ```cd Sockets/Frontend/Server``` folder and then run ```python3 sockettest.py```
2. Then, open the localhost link provided. Now, you can engage with our chat server! 


### The Team:
- [Colin Snow](mailto:csnow@olin.edu "csnow@olin.edu")
- [Maia Materman](mailto:mmaterman@olin.edu "mmaterman@olin.edu")
- [Shirin Kuppusamy](mailto:skuppusamy@olin.edu "skuppusamy@olin.edu")

