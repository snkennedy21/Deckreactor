import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myDecksApi = createApi({
  reducerPath: "myDecks",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.React_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getMyDecks: builder.query({
      query: () => '/decks/',
    }),
  }),
})

export const { useGetMyDecksQuery } = myDecksApi;