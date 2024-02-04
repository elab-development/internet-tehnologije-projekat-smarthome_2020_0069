import { SPOTIFY_API_BASE_URL, CLIENT_ID, CLIENT_SECRET } from "../ApiConfig";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
    SpotifyAccessTokenResponse,
    SpotifySearchResult,
} from "./SpotifyApi.types";

const getAccessToken = async (): Promise<string> => {
    const response = await axios.post<SpotifyAccessTokenResponse>(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }).toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data.access_token;
};

export function useGetAccessToken() {
    const query = useQuery<string, Error>({
        queryKey: ["access-token-key"],
        queryFn: getAccessToken,
    });
    return query;
}

const getTracksFromSearch = async (
    search: string
): Promise<SpotifySearchResult> => {
    const at = await getAccessToken();
    const response = await axios.get<SpotifySearchResult>(
        `${SPOTIFY_API_BASE_URL}search`,
        {
            params: {
                q: search,
                type: "track",
                limit: 20,
            },
            headers: {
                Authorization: `Bearer ${at}`,
            },
        }
    );

    return response.data;
};

export function useGetTracksFromSearch(search: string) {
    const query = useQuery<SpotifySearchResult, Error>({
        queryKey: ["get-tracks", search],
        queryFn: () => getTracksFromSearch(search),
        enabled: false,
    });

    return query;
}
