# To Do List

## Description

This project is a simple to do list which utilized a MERN (MongoDB, Express, React and Node.JS) written in typescript.

## Requisites
1. NPM
2. Docker
3. Node.JS


## Starting Guide
1. Use npm to install dependencies in both client and server
```
npm install
```
2. Create .env file with following fields
    AUTH_KEY=TEST
    DB_USER=admin
    DB_PWD=admin
    DB_URL=mongodb://localhost:27017
    DB_NAME=todolist

3. Start up the docker container for the database folder
```
docker compose up
```
4. Start the client and server using the below command on their respective folders
```
npm start
```
5. Navigate to http://localhost:3000 and create an account to start using!


