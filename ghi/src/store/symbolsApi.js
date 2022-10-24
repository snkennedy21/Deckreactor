import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const symbolsApi = createApi({
  reducerPath: "symbols",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.scryfall.com'
  }),
  endpoints: (builder) => ({
    getSymbols: builder.query({
      query: () => '/symbology/',
    }),
  }),
});

export const { useGetSymbolsQuery } = symbolsApi;