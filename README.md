# Graduate App
# Phone managing system for companys
![Home](https://github.com/470segovia/graduateAppV1.4/blob/main/home.png)

## How to run
Download files and run with docker on root folder:
```docker
docker-compose up --build
```
## Application Overview
This is a full-stack CRUD application that uses React on the frontend and Node.js on the backend. It utilizes a MySQL database to store data, ensuring persistence across different users and systems.

You can add new phone numbers that are either free or associate them with a company, including the name of the client. For convenience in demonstrating the application, there is a script that inserts new information into the database, eliminating the need for manual initialization.
## How to use
Run the docker command showed earlier and go to:
[http://localhost:3000/](http://localhost:3000/)
There you will see a few phone numbers already added. You can add more o delete them. Also update.
## Database
It uses a MySQL database that runs on any system because it's initialized with Docker. To populate the app with some phone numbers at startup, I use a script named init-db.sql, located at the root of the project, which is copied into Docker and executed at startup. 
This script is for a smoother demonstration of the app upon each startup, but it also clears all data at the beginning. So, if you want persistence between executions, I recommend either commenting out the code inside or making necessary modifications.
## OpenAPI
There is a file named openapi.yaml at the root of the project, following OpenAPI recommendations to document every endpoint.
## Docker
I use Dockerfiles inside both the backend and client folders, resulting in three containers running: backend, frontend, and database. This setup allows us to view logs from different containers, making it easier to debug. We can quickly identify what happened and in which component of the application it occurred.

A minor issue that can occur in this setup is when the backend container starts before the database container. In such cases, the backend container attempts to connect to the database, fails, and crashes. However, the database becomes ready afterward. To address this, I implemented a small loop in the backend that first ensures the database is running before attempting to establish a connection.

### Known bugs
UpdatePhoneNumber.jsx is not passing correctly the value of the field of phonenumber to backend so it makes the correct query to database.
Workaround: delete and add new number with company and name.
