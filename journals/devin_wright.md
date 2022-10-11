# Week 15

## October 10, 2022

Today our team began working on enabling our API routes to communicate with the Scryfall external API. This led to discussion on exactly which data we would be passing to the front end and what would be left for additional API calls by the user as needed. While initially we were interested in passing data that would minimize the number of additional calls for data that was already procured in the initial search, ultimately we decided that only the data to display the hover image and names of search results would need to be stored, as well as the multiverse ID of each card to direct to a detail API search on click.

# Week 14

## October 6, 2022

Today our team began developing our FastAPI routers to communicate with our new database in MongoDB. We were able to add a login feature, as well as API calls for CRUD with user accounts and user-created decks.

## October 5, 2022

Today we spent the bulk of our group time continuing to work through the specifics of implementing our databases in SQL using VSCode's Live Share extension. We ran into several issues here, stemming from the fact that we were unsure whether to treat cards in a user's collection (a record of the cards that they physically own) the same as we would cards in a user-created deck (a record of a game-playable combination of virtual cards that they may or may not own as well). We wanted to avoid the duplication of row data wherever possible, but in order to normalize our "Cards" table we appeared to require entries of a card multiple times, one for each appearance it makes in a user's deck (this was deemed inefficient and warranted looking for other options).

Through discussing the implications of what sort of shape our SQL schema might take in either case, we came to a conclusion that a document database like MongoDB might better serve our purposes without having to create tables that might theoretically balloon to thousands of entries or more and become cumbersome to navigate and manipulate. We spent the remainder of the day researching using MongoDB as a potential solution to our database woes before our meeting with Curtis tomorrow to come to a determination on this matter.

## October 4, 2022

Today we had a longer than usual standup, in order to get everyone on the team on the same page with regard to setting up our Dockerfile with multiple microservices. It turned out to be simpler than I thought! We successfully spun up our microservice containers and began exploring pg-admin to learn how to manipulate SQL commands to create table data. We also configured Live Share for VSCode in preparation for setting up our backend as a group tomorrow.

## October 3, 2022

Today I learned a lot about FastAPI and how to use it with SQL database queries. Our group researched together how to properly configure our Docker containers in the docker-compose YAML file for what will eventually become our microservices, and we put together the shell command file to create multiple databases for those microservices.