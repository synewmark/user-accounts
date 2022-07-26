NestJS code to handle user accounts.

Has 2 endpoints:

...user/setUser/

which accepts a name, email, and country, each as strings in a JSON request in the body of a POST request

...user/getUser/

which accepts a string in the url of a GET request as the name of the user to search for

Uses a MySQL database to store the users and a REDIS server for caching. 

Nest will start the REDIS server with the end points, but the MYSQL must be created seperately.

Commands created to create the database and table are as follow:

CREATE DATABASE accounts;

USE accounts;

CREATE TABLE users (

id int NOT NULL AUTO_INCREMENT,

name varchar(255) UNIQUE,

email varchar(255),

country varchar(255),

PRIMARY KEY (id)

);

Note, that with the exception of the value of the size parameter for varchar and the unique designator on name all the details of the table should be considered "Tightly-Coupled" to the code.

The code expects the MySQL server to be running on localhost:3306 with an account name: test and password: test

This can be changed by modifying values in src/app.module