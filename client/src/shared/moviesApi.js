import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_TMDB_API_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export const movieApiSlice = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getTrending: builder.query({
            query: () => {
                return `/trending/movie/day?api_key=${apiKey}`;
            }
        }),
        getPopular: builder.query({
            query: () => {
                return `/movie/popular?api_key=${apiKey}`;
            },
        }),
        getSearchData: builder.query({
            query: (value) => {
                return `/search/multi?api_key=${apiKey}&language=en-US&query=${value}`;
            },
        }),
        getDetailsMovie: builder.query({
            query: (id) => {
                return `/movie/${id}?api_key=${apiKey}`;
            },
        }),
        getDetailsTv: builder.query({
            query: (id) => {
                return `/tv/${id}?api_key=${apiKey}`;
            },
        }),
    })
});

export const {
    useGetTrendingQuery,
    useGetPopularQuery,
    useGetSearchDataQuery,
    useGetDetailsMovieQuery,
    useGetDetailsTvQuery
} = movieApiSlice;


