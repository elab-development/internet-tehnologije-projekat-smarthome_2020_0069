import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SPOTIFY_API_BASE_URL, CLIENT_ID, CLIENT_SECRET } from './ApiConfig';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface SpotifyAccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}
interface SpotifyTracks{
    name: string
}

const spotifyApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: SPOTIFY_API_BASE_URL, prepareHeaders: (headers, { getState }) => {
        headers.set('Authorization', `Bearer ${getAccessToken}`);
        return headers;
      },}),
    endpoints: (builder) => ({
        getSearchResult: builder.query<SpotifyTracks[], void>({
            query: () => "search",
        })
    })
})


const getAccessToken = async (): Promise<string> => {
    const response = await axios.post<SpotifyAccessTokenResponse>(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }).toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return response.data.access_token;
};

export const { useGetSearchResultQuery } = spotifyApi;