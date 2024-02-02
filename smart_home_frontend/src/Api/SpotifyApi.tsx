import { SPOTIFY_API_BASE_URL, CLIENT_ID, CLIENT_SECRET } from './ApiConfig';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SpotifyAccessTokenResponse } from './SpotifyApi.types';

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

export function useGetAccessToken() {
    const query = useQuery<string, Error>({
        queryKey: ['access-token-key'],
        queryFn: getAccessToken
    });
    return query;
}


