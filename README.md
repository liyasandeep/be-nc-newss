# Northcoders News API

## Project Background

In this project i have built an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture which was also built by me.

## Link to hosted version

https://nc-news-be-liya.herokuapp.com/api

You can see a list of available endpoints provided by the API here.

## Set up instructions

1. Set up your own repo

Clone this repo from https://github.com/liyasandeep/be-nc-newss

And then do change directory to move into the cloned folder

You can do the following commands in the terminal for this

```bash
git clone https://github.com/liyasandeep/be-nc-newss

cd be-nc-newss
```

2. Install dependancies

   To install the dependencies used in the project run the following command in the terminal

```
    npm install
```

3. Environment variable setup

We'll have two databases in this project. One for real looking dev data and another for simpler test data.

You will need to create two .env files for your project in the root folder for these datas as:

.env.test and .env.development

Into .env.test file add

```
PGDATABASE=nc_news_test
```

Into .env.development file add

```
PGDATABASE=nc_news
```

Add these files to a `.gitignore` file so they don't get pushed into your git repository

4. Setup the database

To set the databases run the following command

```
    npm run setup-dbs
```

This creates the test(nc_news_test) and development(nc_news) databases.

4. Seeding the local database

To seed the local databases run the following command

```
   npm run seed
```

5. Run test

You can run the test to check whether all the tests associated with the endpoints are working correctly using jest

```
    npm test app.test.js
```

6. Requirements

You will need minimum versions of following modules installed to run this project.

Node.js v18.7.0

PostgreSQL 14.5
