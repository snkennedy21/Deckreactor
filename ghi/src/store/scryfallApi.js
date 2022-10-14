import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scryfallApi = createApi({
  reducerPath: "scryfall",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => `/scryfall/wizard`,
    }),
  }),
});

export const { useGetCardsQuery } = scryfallApi;
