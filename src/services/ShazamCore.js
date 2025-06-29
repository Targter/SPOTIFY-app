// api/shazamCore.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "fb0f784596msh34a58799897ad94p18342bjsn29bcf33379bb"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: ({ countryCode = "IN", page = 1, pageSize = 20 }) =>
        `v1/charts/world?country_code=IN&page=${page}&limit=${pageSize}`,
    }),
    getSongsByGenre: builder.query({
      query: ({ genre, countryCode = "IN" }) =>
        `v1/charts/genre-world?genre_code=${genre}&country_code=${countryCode}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `v1/tracks/details?track_id=${songId}`,
    }),
    getSongRelated: builder.query({
      query: (songId) => `v1/tracks/related?track_id=${songId}`,
    }),
    getAroundYou: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetAroundYouQuery,
} = shazamCoreApi;
