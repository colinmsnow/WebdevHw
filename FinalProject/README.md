# 'Chit Chat' Chat Server Web Development Project
## Colin Snow, Maia Materman, Shirin Kuppusamy
### Emails: csnow@olin.edu, mmmaterman@olin.edu, skuppusamy@olin.edu

Set Up:

Node
If you don't have nodejs installed, install the latest version. If you don't know, do node --version in your terminal/command prompt. If you don't get a number, you don't have it.

Flask


How to Run Our Code: 

Part 1: Create a mySQL Server:

1. Install mySQL if you don't already have it installed. An installation guide is located at this link: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/installing.html \
For Ubuntu/Debian, you can either download the repo from the following link: https://dev.mysql.com/downloads/repo/apt/ or run the following command ```sudo apt-get install mysql-client mysql-server mysql-common```
2. Now, you will have to create a new server that doesn't use root. Follow the instructions at this link provided in Option 2 of the first answer:
https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost \
A few notes include, with the caveat that for the system user and password, you can also use any other name you would like, but be sure to change it accordingly in database.py (located in Socket/Frontend/Server): \
   * Instead of using 'YOUR_SYSTEM_USER' use 'dbuser' \
   * Instead of using 'YOUR_PASSWD' use '1234' \
   * Instead of using SET plugin='auth_socket' use SET plugin='mysql_native_password' \
3. In case, you run into any issues, here is a guide on how to uninstall and reinstall mySQL: https://www.cyberciti.biz/faq/linux-completely-reinstall-mysql-server/

Part 2: Set Up the Frontend:

1. ```cd Sockets/Frontend/frontend/src/components``` folder and then run ```npm install```
2. Once you have successfully installed npm, in the same folder, run ```npm run build```

Part 3: Run the Actual Chat Server:

1. ```cd Sockets/Frontend/Server``` folder and then run ```python3 sockettest.py```
2. Then, open the localhost link provided. Now, you can engage with our chat server! 
