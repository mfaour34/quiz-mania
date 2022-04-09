# Quiz challenge absence.io GmbH

## To run and accept http requests
clone repo and create a .env file, in which you will have to add the following
 - HTTP_PORT=<your_http_port>
 - API_ACCESS_TOKENS=<access_token> (note that to add several access token, seperate by comma)

## API Documentation
 - this is the [postman documentation](https://documenter.getpostman.com/view/13953495/UVyxRZP6#auth-info-5172ff7a-e587-4db7-a843-c522d4fcde07) for the API

## Basics
The challenge is to create a small API for a quiz app where users can create and attempt quizzes. The users should also be able to see some basic stats about their quiz attempts.

There are no front-end requirements for this task.


## Working on and Submitting the Challenge
  - Create a new repository under your GitHub account.
  - Complete an implementation for this challenge inside your repository.
  - When done, send us a link to your repository.


## Requirements
  - This challenge must be completed using [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com/).
  - The final result must be a GitHub repository with your challenge solution.


## Acceptance criteria
  - Users can create an account
  - Users can create their own quiz with multiple questions & answers.
  - Users cannot manipulate other users' quiz templates.
  - Users can attempt other users' published quizzes as many times as they choose.
  - Users can view basic stats on quiz attempts/completion/scores/etc..
  - Quizzes must contain at least 1 question and should support varying numbers of questions.
  - Questions must have a non-empty question and a non-empty answer
  - Each submitted quiz should have it's questions marked correct or incorrect based on the predefined answers.


## Goal
The goal of this challenge is to gain an understanding of the candidate's problem solving processes, basic understanding of required technologies, and how they approach common, real-world issues any developer may face.


## What We Would Consider a Plus
- Going that extra mile on any aspect of the app


## Helpful Links
 - [Node.js Official Guides](https://nodejs.org/en/docs/guides/)
 - [MongoDB Official Guides](https://docs.mongodb.com/guides/)
 - [Mongoose ODM Official Guides](https://mongoosejs.com/docs/index.html)


Should you have any questions - please don't hesitate to ask.
