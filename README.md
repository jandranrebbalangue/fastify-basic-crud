# Fastify CRUD API Project

A simple CRUD API built for practice using Fastify, PostgreSQL, and Kyseley.

## Getting Started

### Clone the Repository

- `git clone https://github.com/jandranrebbalangue/fastify-basic-crud.git`
- `cd fastify-basic-crud`

### Install Dependencies

- `yarn install`

### Set up PostgreSQL

1. Start a database: `yarn start:db`
2. After creating a new database, you can set up pgAdmin by accessing http://localhost:5050.

## Usage

Start the Fastify server in development mode:

- `yarn dev`

## API Endpoints

- Create Record: POST /persons
- Read Records:
  - All: GET /persons
  - Single: GET /persons/:id
- Update Record: PUT /persons/:id
- Delete Record: DELETE /persons/:id
