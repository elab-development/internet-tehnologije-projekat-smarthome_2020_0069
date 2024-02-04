import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import {
    CreateSpeakerResponse,
    DeviceModel,
    Speaker,
    SpeakersModel,
} from "./SpeakersApi.types";

const getSpeakers = async (
    page_number: number,
    page_size: number
): Promise<SpeakersModel> => {
    const response = await axios.get<SpeakersModel>(
        `${SMART_HOME_API_BASE_URL}device/speaker/get_speakers`,
        {
            params: {
                page_number: page_number,
                page_size: page_size,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );
    return response.data;
};

export const useGetSpeakers = (page_number: number, page_size: number) => {
    const query = useQuery<SpeakersModel, Error>({
        queryKey: ["get-speakers-key"],
        queryFn: async () => await getSpeakers(page_number, page_size),
    });
    return query;
};

const patchSpeakerSong = async (
    speakerId: string,
    song: string,
    author: string,
    image_url: string
): Promise<Speaker> => {
    const response = await axios.patch<Speaker>(
        `${SMART_HOME_API_BASE_URL}device/speaker/${speakerId}`,
        {
            speaker: {
                song,
                author,
                image_url,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );
    return response.data;
};

export const usePatchSpeakerSong = (
    speakerId: string,
    song: string,
    author: string,
    image_url: string
) => {
    const query = useQuery<Speaker, Error>({
        queryKey: ["patch-speaker-song-key"],
        queryFn: async () =>
            await patchSpeakerSong(speakerId, song, author, image_url),
        enabled: false,
    });
    return query;
};

const patchSpeakerState = async (
    speakerId: string,
    state: string
): Promise<DeviceModel> => {
    const response = await axios.patch<DeviceModel>(
        `${SMART_HOME_API_BASE_URL}device/${speakerId}`,
        {
            device: {
                state,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );
    return response.data;
};

export const usePatchSpeakerState = (speakerId: string, state: string) => {
    const query = useQuery<DeviceModel, Error>({
        queryKey: ["patch-speaker-state-key"],
        queryFn: async () => await patchSpeakerState(speakerId, state),
        enabled: false,
    });
    return query;
};

const createSpeaker = async (
    location_id: string,
    place: string,
    state: string,
    volume: number,
    bass: number,
    battery: number
): Promise<CreateSpeakerResponse> => {
    const response = await axios.post<CreateSpeakerResponse>(
        `${SMART_HOME_API_BASE_URL}device/speaker`,
        {
            speaker: {
                location_id,
                place,
                state,
                volume,
                bass,
                battery,
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );

    return response.data;
};

export const useCreateSpeaker = (
    location_id: string,
    place: string,
    state: string,
    volume: number,
    bass: number,
    battery: number
) => {
    const query = useQuery<CreateSpeakerResponse, Error>({
        queryKey: ["speaker-key"],
        queryFn: async () =>
            await createSpeaker(
                location_id,
                place,
                state,
                volume,
                bass,
                battery
            ),
        enabled: false,
        retry: 0,
    });
    return query;
};

const editSpeaker = async (
    speaker_id: string,
    volume: number,
    bass: number
): Promise<any> => {
    const response = await axios.patch<any>(
        `${SMART_HOME_API_BASE_URL}device/speaker/${speaker_id}`,
        {
            speaker: {
                volume,
                bass,
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );

    return response.data;
};

export const useEditSpeaker = (
    thermostat_id: string,
    volume: number,
    bass: number
) => {
    const query = useQuery<any, Error>({
        queryKey: ["thermostat-edit-key"],
        queryFn: async () => await editSpeaker(thermostat_id, volume, bass),
        enabled: false,
        retry: 0,
    });
    return query;
};
