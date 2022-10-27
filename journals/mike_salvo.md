# Week 14

## October 3, 2022

Today was spent researching and exploring FastAPI. Collaborating as a group deciding what database and how to setup our docker yaml file.

## October 4th, 2022

Today we had a longer than usual stand up meeting. Consisting of datastructures and how we will build our models. It was a very productive meeting brainstorming our backend details deciding properties for our models

## October 5th, 2022

Took time to understand our code for our api endpoints for cards. Researched more about FASTAPI and our Postgres database. After consideration we may need to choose a different database based on our table data.

## October 6th, 20022

In standup today we talked over the pros and cons for out database choice and decided that we will impliment a mongo db. after we created our yaml file docker files database volumes. Compose was succesful and began writing routes and queries for our api's. We went with some pair programming in our group today. Devin and I were working on accounts and sean and thomas were working on decks.
crud was created for accounts and all but updates were completed for decks. We are definately starting to get some traction after our database change.

## October 10th, 20022

In stand up today we were deciding our api endpoints for searches. Devin and I worked on basic search funcionality and came up with similar code. Devin added in pagination for larger results.

## October 11th, 20022

In stand up today we talked over todos for our day to tackle. 1 how to impliment our advanced search. which Devin and I came up with that would be accomplished on the front end. building a api endpoint based on user inputs on a form. discussed with our group and they aggreed. 2nd add cards to deck. We worked as a group on this one. creating an endpoint to search for a card based on the multiverse id as an input. then shaping that data. As of now the 3rd of add card to collection might be accomplished by grabbing that card from the database based on the user id that was attatched. this may change. lastly added endpoint to remove all card copies from deck.

## October 12th 2022

Stand up today consisted of a checklist to somewhat complete the backend development. Devin and I implimented the creation of a collection when a user is created. This collection is user specific and will be used store all the user owned cards. We added a feature to add cards to that collection. A feature to remove a single card from that collection and a feature to remove all copies of that specific card in the collection. As it looks now we just need to determine if our routes are secure enough with the account id being used to update specific feature. This we will discuss tomorrow in a Q&A with our instructors

## October 13th 2022

Stand up this morning we talked about what css styles and templates we wanted to use. We decided between material ui and react bootstrap. We will give it the day to test between them to decide which we will use. I spent most of the time expementing with material ui and found lots of great start components that are extermely useful. So far i choose material ui.

## October 14th 2022

Stand up this morning we decided that react bootstrap was the way to go. some of the other team mates had issues with documentation and the unfamiliarity of the material ui application. I began to build the collections component for user card collection. I will need to fetch data from the database for the current user and display all of the user cards with in a card binder style presentation.

## October 17th 2022

In stand up today we discussed what we all were going to work on so we werent overlapping each others progress. Today I built a collection component first in a table style format without css just for functionality. Testing the database calls for different user id's i am researching adding a card to the collection and removing a card from the collection with the provided routes.

## October 18th 2022

Today I am working on a card collection page in a binder style format. created a feature to add card to user collection.
Working with our instructor to better understand the authentication process. In the end we got a great explanation and were able to impliment authentication successfully

## October 19th

Today I created a remove card from collection feature utilizing the routes to delete 1 of that cards quantity from the collection. currently both add and remove work but i need to refetch from the database to update the front end. I also needed to edit the account routes to include the account id with the credential rather than having to drill it from a token on the front end to include in the url to add remove cards from collection.

## October 20th 2022

Today I found that if i make the call to remove or add the card i can update the state on the front end to relect the qty without calling a refresh. I did this by using a reducer. added css to both collection list and collection page. Added custom css feature to enable scrolling on larger collections. Added links to the cards in both displays that will redirect to the same card in a card detail view component.

## October 21st 2022

Today I cleaned up the collection components added a basic 404 page matching our wireframe design if a user types in the wrong url address. working on a feature to find a part of and image based on x and y axis that way on click a message will be displayed that they have found the object in the image. I also created a feature of a mini game / easter egg for users to find in the collection component. when this easter egg is clicked on it will redirect them to the mini game.
the mini game feature is a card matching game using magic the gathering card images front and back. upon matches the 2 cards stay flipped. when 2 cards do not match they turn back over untill the game is complete.

## October 24th 2022

working on finding a solution to the x and y axis for the image in the 404 page.
reading over ci/cd cookbook and writing unit tests

## October 25th 2022

As a group we were writing our unit tests. Having authentication caused issues in building them successfully. Andrew from another cohort came by and explained the process and all tests were written.

## October 26th 2022

Added Navigation to home after sign in and login. spent time running through the app looking for bugs as we are getting ready for deployment. Started the process and trying to follow along with the ci/cd cookbook. not much success. Daniel from another cohort will be coming by tomorrow to help us through the process.

## October 27th 2022

Today we are working through the deployment process with the other cohort instructor Daniel. So far we made it through unit tests and linting test.
