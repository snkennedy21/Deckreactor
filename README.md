# DeckReactor

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">DeckReactor</h3>

  <p align="center">
    A website to search for Magic cards, manage your card collection, and build your favorite decks.
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-deckreactor">About DeckReactor</a></li>
    <li><a href="#target-audience">Target Audience</a></li>
    <li>
      <a href="#functionality">Functionality</a>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#search">Search</a></li>
        <li><a href="#collection">Collection</a></li>
        <li><a href="#decks">Decks</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About DeckReactor

DeckReactor is a simple card search and deck/collection management application for Magic the Gathering cards. Visitors to the site can find cards using a number of different search criteria. Additionally, users that sign up/login can create and track their collection of cards they physically own, as well as create and customize decks of cards for regular play.

## Target Audience

Our target audience is fans of the Magic the Gathering card game of all skill levels who are looking to learn more about the game's cards, organize their personal collections, or assemble card decks.

## Functionality

### Home

Home Page:

- link to the login/signup page
- image carousel with clickable images of a site-determined set of cards (currently vampires/werewolves)

Nav Bar:

- Link to Advanced Search for newer users to narrow down their search
- More experienced users can type Scryfall's query syntax to accomplish even more precise searches using only the nav search bar.
- Logged-in users have access to links to view their decks and collection

### Search

Basic Search:

- Searches for cards based on letters in the name of the card. Can also use any of Scryfall's syntax.
- When searching for a specfic card, basic search will take you directly to that card's detail page.

Advanced Search:

- A feature to help you find **exactly** what you're looking for. This feature allows you to search by not only the cards name, but also by converted mana cost, color, rarity, type, and format legality.

### Collection

Card Collection Page:

- Visiting the Collection page requires the use to be authenticated (logged in)
- When Authenticated the user can view all cards added to their collection.
- The collection page will display the users estimated value, total cards, and quantity of each card.
- Each card in the collection will have a link to the details of that card.
- Inside the collection page the user can find a mini game located inside the collection.
  The mini game is a card matching game with 6 MTG cards that get randomly generated into different locations on the board.

Edit Collection Page:

- Similar to the Collection page this page will be displayed in a table format with the ability to add and remove cards from their collection.

### Decks

Deck List Page:

- Visiting the Decks page requires the user to be authenticated (logged in)
- Authenticated users can create new decks on the My Decks page by clicking "Create Deck" and filling out the modal form
- Authenticated users can click on the "View Deck" button to view a page that has all of the details for the selected deck

Deck Detail Page:

- The deck detail page contains a list of all of the users cards and other relevant deck data (average mana cost, legal formats, and mana colors)
- Authenticated users can increase or decrease the number any card that exists in their deck
- Authenticated users can click on a card in their deck to navigate to the detail view page for the selected card
- Authenticated users can also add cards to their deck from the search results page and the card detail page

<!-- Getting Started -->

Please follow these steps to deploy and use this application on your local machine:

1. Clone repository to your local machine
2. CD into the project directory
3. Run `docker volume create deck-reactor-node-modules`
4. Run `docker volume create deck-reactor-mongo-data`
5. Run `docker compose build`
6. Run `docker compose up`
7. Enjoy searching for your favorite cards and managing your collection!

<!-- Contact -->

## Contact

Devin Wright | <devin.wright.software@gmail.com> | <https://gitlab.com/dtw2111>

Mike Salvo | <msalvo.dev@gmail.com> | <https://gitlab.com/mbsalvo1>

Sean Kennedy | <snkennedy21@gmail.com> | <https://gitlab.com/snkennedy21>

Thomas Brand | <tbrand61@gmail.com> | <https://gitlab.com/CptSyrup>
