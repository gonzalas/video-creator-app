# Video Creator Backend

The server side is made in NodeJS with NestJS framework (https://nestjs.com/) following the classes convention.
The database is in PostgreSQL using Sequelize as ORM. For local development it is using a docker container to start the database.

### Setup

To start the server locally:
Create a new `.env` file. Copy `.env.example` on it.
Open terminal and write:
`docker compose up` (to init the database)
`npm start` (to start the server)

This will start the postgres database container and the server. You must use a Node version 18 or above.

### Swagger API

You can check Swagger API documentation:
`http://localhost:3000/api`

You can perform request to the server with the Swagger documentation.

The endpoints are protected through JWT, so you first will need to create an user:
`POST /users/create`
Next, you will need to get an auth token:
`POST /auth/login`
Grab the token and on top of Swagger page click in `Authorize` and paste the token (do not include `bearer` word, just the token).

### Visualize database through PgAdmin

In the docker compose file it is included a pgAdmin instance that you can access on a browser.
The url would be `http://localhost:5050`. You can login with admin credentials: `admin@admin.com`:`pgadmin4`.
Then create the connection instance: database host name `db`, maintenance database `postgres`, username `postgres` and password `postgres`.

### Unit test

Run `npm run test`
