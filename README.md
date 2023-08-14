# Video Creator Backend

The server side is made in NodeJS with NestJS framework (https://nestjs.com/) following the classes convention.
The database is in PostgreSQL using Sequelize as ORM. For local development it is using a docker container to start the database.

### Setup

To start the server locally:
`cd server`
Then create a new `.env` file. Copy `.env.example` on it.
Open terminal under `/server` and write:
`docker compose up`
`npm start`

This will start the postgres database container and the server. You must use a Node version 18 or above.

You can check Swagger API documentation:
`http://localhost:3000/api`
The endpoints are protected through JWT, so you first will need to create an user:
`POST /users/create`
Next, you will need to get an auth token:
`POST /auth/login`
Grab the token and on top of Swagger page click in `Authorize` and paste the token (do not include `bearer` word, just the token)
