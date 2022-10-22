// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {decks: []};

// export const myDecksSlice = createSlice({
//   name: "myDecks",
//   initialState,
//   reducer: {
//     getMyDecks: async (state) => {
//       const decksUrl = `${process.env.REACT_APP_API_HOST}/decks/`;
//       const response = await fetch(decksUrl);
//       if (response.ok) {
//         const data = await response.json();
//         state.decks = data.decks;
//       }
//     },
//     clearDecks: (state) => {
//       state = initialState;
//     },
//     addCard: async (state, action) => { // must receive deck_id, multiverse_id as keys in action object
//       const deck_id = action.deck_id;
//       const multiverse_id = action.multiverse_id;
//       for (let deck of state.decks) {
//         if (deck.id === deck_id) {
//           for (let card of deck.cards) {
//             if (card.multiverse_id === multiverse_id) {
//               card.quantity += 1;
//             }
//           }
//           const cardUrl = `https://api.scryfall.com/cards/multiverse/${multiverse_id}`;
//           const response = await fetch(cardUrl);
//           if (response.ok) {
//             const data = await response.json();
//             const newCard = {
//               name: data.name,
//               multiverse_id: multiverse_id,
//               mana: data.mana_cost,
//               card_type: data.type_line,
//               cmc: data.cmc,
//               formats: Object.entries(data.legalities).filter(([legality, format]) => format === 'legal').map(entry => entry[0]),
//               quantity: 1,
//               picture_url: data.layout in ['modal_dfc', 'transform'] ? data.card_faces[0].image_uris.normal : data.image_uris.normal,
//             }
//             deck.cards.append(newCard);
//           }
//         }
//       }
//     },
//     removeCard: (state, action) => { // must receive deck_id, multiverse_id as keys in action object
//       const deck_id = action.deck_id;
//       const multiverse_id = action.multiverse_id;
//       for (let deck of state.decks) {
//         if (deck.id === deck_id) {
//           for (let card of deck.cards) {
//             if (card.multiverse_id === multiverse_id) {
//               card.quantity -= 1;
//               deck.cards = deck.cards.filter(card => card.quantity !== 0);
//             }
//           }
//         }
//       }
//     },
//     removeOneCardCopy: (state, action) => { // must receive deck_id, multiverse_id as keys in action object
//       for (let deck of state.decks) {
//         if (deck.id === action.deck_id) {
//           deck.cards = deck.cards.filter(card => card.multiverse_id !== action.multiverse_id);
//         }
//       }
//     },
//   }
// });

// export const { getMyDecks, clearDecks, addCard, removeCard, removeOneCardCopy } = myDecksSlice.actions;