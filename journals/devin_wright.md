# Week 17

## October 28, 2022

Today our group continued resolving build job deployment errors on the front end. In preparation for deploying and submitting our project, we continued to work on minor CSS styling, readme, and render bugs.

## October 27, 2022

Today I added a new main logo, which can also be used as a spinner loading icon. I added the CSS to achieve this, and began working on a deck deletion modal that will appear when clicking a delete button on the deck's detail page. I also added a "Random Card" button on the home page, inspired by Google's "I'm Feeling Lucky" button.

As a group, we continued to work on deployment of our website. We wrote tests for our backend, and formatted our code to pass our build tests. We also began writing our readme.

## October 26, 2022

Today I finished an initial draft of a deck cards list that will display at the top of the deck's detail page. Our group also began reviewing the steps needed for CI/CD and configuring environment variables/our .gitlab-ci YML file. We continued to write tests for our backend.

Lastly, I worked on fixing rendering bugs on the deck detail page. The background is supposed to render only once on page load, and reload the correct theme any time the details of that deck change its dominant color. There remains a rendering bug with the numbers of cards displayed in the deck when clicking the add/remove buttons, however.

## October 25, 2022

Today I finished incorporating RTK query into most of our components to minimize lines of code and number of refetches back to the database for the same information. We discussed a means of shrinking the size of the data being passed between the front and back end by using more complex validation tags (i.e., one for each deck so it is only refetched if a change is made to that deck, rather than fetching all of a user's decks each time any change is made to any of them).

We also began to work on writing database tests for deployment. However, we ran into an issue regarding authentication for some of the routes we were hoping to test. For example, when a user creates their account, the same route also adds a user's collection to the database. We would need to provide valid token data (or fake token data) as the expected output, but would also need to create a fake collections database to see if a new document is made there.

Lastly, I worked on several display bugs as we pushed our most recent branches to development-branch, such as allowing flip-layout cards to be rotated 180º on click, not refetching random background image data upon multiple renders, and redirecting the user to a card's detail page if that card is the only search result.

## October 24, 2022

Today our team merged the most recent versions of our work from over the weekend, and I began integrating the RTK Query store that I set up with components in the app besides the card detail page. I also refactored much of the code in the card detail page into separate files to make the tools more reusable, such as parsing strings with symbol data or retrieving a themed background from a predetermined list.

# Week 16

## October 20, 2022

Today I attempted to implement a store in Redux in order to store a logged in user's created decks. However, as I worked I realized I would need to implement async functions (such as when adding a new card to a deck, I would need to obtain that card's data from Scryfall's API). After reading errors that I would need custom middleware to handle my async methods within my query, I concluded that an API slice set up using RTK Query would make a better solution for data retrieval.

## October 19, 2022

Today I implemented formatting for displaying power, toughness, and loyalty stats for single- and double-faced cards on their detail page. Our group also worked together to finish the account authorization features. We were confronted with a bug that arose from the token request completing too quickly for 

## October 18, 2022

Today I added mana symbols to the card detail page, with code that can be reused to parse any string with those symbols. Our team worked together to implement signup/login/logout functionality. I learned more about how data is sent to/retrieved from the Redux store, and began work on a form on the card detail page to allow users to send the card to their deck or collection.

## October 17, 2022

Today I worked on creating a card detail view page based on the card's multiverse ID which is passed into the component through the URL path using UseParams(). I was able to display the card's front/back images, its details, and a background that corresponds to the color of the card. I am trying to figure out how to convert the strings found in the card data (e.g., "{W}" refers to one white mana) into the actual card symbols using Scryfall's api call for symbols.

# Week 15

## October 14, 2022

Today I experimented creating React components that could be reusable in different areas of our site, such as the card search results component. I also researched React Redux and the ways it might be applied to data that would be best stored in a global state, such as the nav search bar and a user's currently selected deck.

## October 13, 2022

Today our group began exploring options for which CSS framework would be best to use for our front end. We researched Material UI as a possible solution, but decided that Bootstrap would provide a more practical solution to fit with our timetable.

## October 12, 2022

Today I worked on bug fixes and added some extra routes to our backend API. We added routes for user collections, including creation of a user's collection on account creation, and adding/removing cards from collection. We also worked on adding cascade on account deletion functionality for a deleted user's decks and collection. We also noticed that certain API routes require input of a user's account_id to run, while certain others (e.g., create deck and view my decks) obtained the data from the current logged in user's token. We discussed the viability of each approach, and whether refactoring of certain routes was warranted for account security purposes.

## October 11, 2022

Today we nearly finished work on our API routes to communicate with our front end. These included routes to add/remove cards to a user's deck, as well as to remove all cards of particular name from the deck. We were unsure whether to also include a route for the Advanced Search page, and ultimately decided that what we had already made for the Nav bar search was sufficient. We reasoned that we could simply construct the required search query string using the values from the Advanced Search form fields on the front end, and that string could then be passed to Scryfall the exact same way as if the user had typed the properly formatted query string out themselves in the Nav search bar.

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