##  User Application Setup Guide

This guide helps you set up a user application that switches between databases dynamically using Nest.js, TypeORM, Redis, and PostgreSQL. The application also uses caching to improve the speed of fetching product results.

##  Before You Start

Make sure you have Docker installed on your computer. Docker will create a virtual environment for the application to run in.

##  How to Set Up
```bash
# Setting Up Docker

# Build the App:
 $ docker-compose build

# Launch the App:
$ docker-compose up -d
```

## To set up a new clients database:

```bash
# Install `pnpm` globally 
$ npm install -g pnpm

# Install `ts-node` globally
$ pnpm add global ts-node

# Initialize the database by running 
 $ ts-node scripts/db-init.ts
```
## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test
```

##  Testing APIs with Postman

Use Postman as a client with provided files to test but but make sure you have imported the files first.

```bash
# Environment File: `user-app.postman_environment.json`
# Collection File: `user-app.postman_collection.json`
```

To switch between databases, modify the header key `x-db-name` in Postman. Changing this key will direct your API calls to the specified database.