# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Step 1 Set up your own repo

Clone this repo from https://github.com/northcoders/be-nc-news

In terminal Do

git clone https://github.com/northcoders/be-nc-news

change directory to be-nc-news

cd be-nc-news

In Github make your own public repository for your project

Do not initialise the project with a readme, .gitignore or license.

From your cloned local version of the project you'll want to push your code to your new repository in github using the following commands:

git remote set-url origin YOUR_NEW_REPO_URL_HERE # This will set remote to our new repo url and prevent from pushing to northcoders repo
git branch -M main # create main branch in new repo
git push -u origin main # pushes to main branch (Branch 'main' set up to track remote branch 'main' from 'origin')

## Step 2 : Setting up the Project

We'll have two databases in this project. One for real looking dev data and another for simpler test data.

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You have also been provided with a db folder with some data, a setup.sql file and a seeds folder. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

The job of index.js in each the data folders is to export out all the data from that folder, currently stored in separate files. This is so that, when you need access to the data elsewhere, you can write one convenient require statement - to the index file, rather than having to require each file individually. Think of it like a index of a book - a place to refer to! Make sure the index file exports an object with values of the data from that folder with the keys:

topicData
articleData
userData
commentData

## Kanban

### Link to your Trello Board here: https://trello.com/b/7yiHe1nI

To keep track of the tasks involved in this project we're going to use a kanban board. Ensure that you work on one _ticket_ at time. You can click on the ticket to find out more information about what is required for the feature. A ticket is not considered complete unless both the happy path and errors response are handled. You can make use of the checklist on each ticket to keep track of the errors you want to handle. You can also make use of [error-handling.md](error-handling.md) to consider the error codes we may wish to respond with.

**Please ensure you work through the tickets in numerical order.**

## Git Branching and Pull Requests

You will be working on each ticket on a new **branch**.

To create and switch to a new git branch use the command:

```
git checkout -b <new branch name>
```

This will create a branch and move over to that branch. (Omit the `-b` flag if you wish to switch to an already existing branch).

We recommend that you name the branch after the number assigned to each ticket via the header. eg. `ncnews-1`

When pushing the branch to git hub ensure that you make reference to the branch you are pushing to on the remote.

```
git push origin <branch name>
```

From github you can make a pull request and share the link and ticket number via a pull request specific nchelp using the command `nchelp pr`. A tutor will swing by to review your code. Ensure that you keep your trello up to date whilst you await the PR approval. Regular `nchelp` will be available for when you need support.

Once a pull request been accepted be sure to switch back to the main branch and pull down the updated changes.

```
git checkout main

git pull origin main
```

You can tidy up your local branches once they have been pull into main by deleting them:

```
git branch -D <local branch>
```

## Husky

To ensure we are not commiting broken code this project makes use of git hooks. Git hooks are scripts triggered during certain events in the git lifecycle. Husky is a popular package which allows us to set up and maintain these scripts. This project makes use a _pre-commit hook_. When we attempt to commit our work, the script defined in the `pre-commit` file will run. If any of our tests fail than the commit will be aborted.

The [Husky documentation](https://typicode.github.io/husky/#/) explains how to configure Husky for your own project as well as creating your own custom hooks.\_
