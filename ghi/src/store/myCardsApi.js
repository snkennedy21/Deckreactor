import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { accountApiSlice } from "./accountApi";

export const myCardsApi = createApi({
  reducerPath: "myCards",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = accountApiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set(
          "Authorization",
          `${tokenData.token_type} ${tokenData.access_token}`
        );
      }
      return headers;
    }
  }),
  tagTypes: ['DeckList', 'Collection'],
  endpoints: builder => ({
    // DECK STUFF //
    getMyDecks: builder.query({
      query: () => '/decks/',
      providesTags: ["DeckList"],
      credentials: 'include',
    }),
    addCardToDeck: builder.mutation({
      query: (data) => ({
        url: `/decks/${data.deckId}/add/${data.multiverseId}/`,
        method: 'put',
        credentials: 'include',
      }),
      invalidatesTags: ["DeckList"],
    }),
    removeOneCardFromDeck: builder.mutation({
      query: (data) => ({
        url: `/decks/${data.deckId}/remove_one/${data.multiverseId}/`,
        method: 'put', 
        credentials: 'include',
      }),
      invalidatesTags: ["DeckList"],
    }),
    createDeck: builder.mutation({
      query: (data) => ({
        url: '/decks/',
        method: 'post',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ["DeckList"],
    }),
    // COLLECTION STUFF //
    getMyCollection: builder.query({
      query: () => '/collections/',
      providesTags: ['Collection'],
    }),
    addCardToCollection: builder.mutation({
      query: (data) => ({
        url: `/collections/add/${data.multiverseId}`,
        method: 'put',
        credentials: 'include',
      }),
      invalidatesTags: ['Collection'],
    }),
    removeCardFromCollection: builder.mutation({
      query: (data) => ({
        url: `/collections/remove_one/${data.multiverseId}`,
        method: 'put',
        credentials: 'include',
      }),
      invalidatesTags: ['Collection'],
    }),
  })
});

export const {
  useGetMyDecksQuery,
  useAddCardToDeckMutation,
  useRemoveOneCardFromDeckMutation,
  useCreateDeckMutation,
  useGetMyCollectionQuery,
  useAddCardToCollectionMutation,
  useRemoveCardFromCollectionMutation,
} = myCardsApi;