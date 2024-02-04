import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import { CreateLightResponse, Light, LightsModel } from "./LightsApi.types";

const getLights = async (
    page_number: number,
    page_size: number
): Promise<LightsModel> => {
    const response = await axios.get<LightsModel>(
        `${SMART_HOME_API_BASE_URL}device/light/get_lights`,
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

export const useGetLights = (page_number: number, page_size: number) => {
    const query = useQuery<LightsModel, Error>({
        queryKey: ["get-lights-key"],
        queryFn: async () => await getLights(page_number, page_size)
    });
    return query;
};

const getLightState = async (
    lightId: string,
    state: boolean
): Promise<Light> => {
    const response = await axios.get<Light>(
        `${SMART_HOME_API_BASE_URL}device/light/${lightId}/${
            state ? "turn_on" : "turn_off"
        }`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );
    return response.data;
};

export const useGetLightState = (lightId: string, state: boolean) => {
    const query = useQuery<Light, Error>({
        queryKey: ["get-light-turn-on-key"],
        queryFn: async () => await getLightState(lightId, state),
        enabled: false,
    });
    return query;
};

const patchLightColor = async (
    lightId: string,
    rgb_color: string
): Promise<Light> => {
    const response = await axios.patch<Light>(
        `${SMART_HOME_API_BASE_URL}device/light/${lightId}`,
        {
            light: {
                rgb_color,
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

export const usePatchLightColor = (lightId: string, rgb_color: string) => {
    const query = useQuery<Light, Error>({
        queryKey: ["patch-light-color-key"],
        queryFn: async () => await patchLightColor(lightId, rgb_color),
        enabled: false,
    });
    return query;
};

const createLight = async (
    location_id: string,
    place: string,
    state: string,
    light_level: number,
    rgb_color: string
): Promise<CreateLightResponse> => {
    const response = await axios.post<CreateLightResponse>(
        `${SMART_HOME_API_BASE_URL}device/light`,
        {
            light: {
                location_id,
                place,
                state,
                light_level,
                rgb_color,
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

export const useCreateLight = (
    location_id: string,
    place: string,
    state: string,
    light_level: number,
    rgb_color: string
) => {
    const query = useQuery<CreateLightResponse, Error>({
        queryKey: ["light-key"],
        queryFn: async () =>
            await createLight(
                location_id,
                place,
                state,
                light_level,
                rgb_color
            ),
        enabled: false,
        retry: 0,
    });
    return query;
};

const editLight = async (
    light_id: string,
    light_level: number
): Promise<any> => {
    const response = await axios.patch<any>(
        `${SMART_HOME_API_BASE_URL}device/light/${light_id}`,
        {
            light: {
                light_level,
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

export const useEditLight = (purifier_id: string, timer: number) => {
    const query = useQuery<any, Error>({
        queryKey: ["light-edit-key"],
        queryFn: async () => await editLight(purifier_id, timer),
        enabled: false,
        retry: 0,
    });
    return query;
};
