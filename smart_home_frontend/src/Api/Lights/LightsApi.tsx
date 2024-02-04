import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import { Light, LightsModel } from "./LightsApi.types";


const getLights = async (page_number: number, page_size: number): Promise<LightsModel> => {
    const response = await axios.get<LightsModel>(
        `${SMART_HOME_API_BASE_URL}device/light/get_lights`,
        {
            params: {
                page_number: page_number,
                page_size: page_size
            },
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    )
    return response.data;
}

export const useGetLights = (page_number: number, page_size: number) => {
    const query = useQuery<LightsModel, Error>({
        queryKey: ["get-lights-key"],
        queryFn: async () => await getLights(page_number, page_size),
    });
    return query;
};

const getLightState = async (lightId: string, state: boolean): Promise<Light> => {
    const response = await axios.get<Light>(
        `${SMART_HOME_API_BASE_URL}device/light/${lightId}/${ state ? ("turn_on") : ("turn_off")}`,
        {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    )
    return response.data;
}

export const useGetLightState = (lightId: string, state: boolean) => {
    const query = useQuery<Light, Error>({
        queryKey: ["get-light-turn-on-key"],
        queryFn: async () => await getLightState(lightId, state),
        enabled: false
    });
    return query;
};

const patchLightColor = async (lightId: string, rgb_color: string): Promise<Light> => {
    const response = await axios.patch<Light>(
        `${SMART_HOME_API_BASE_URL}device/light/${lightId}`,
        {
            light:{
                rgb_color
            }            
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    )
    return response.data;
}

export const usePatchLightColor = (lightId: string, rgb_color: string) => {
    const query = useQuery<Light, Error>({
        queryKey: ["patch-light-color-key"],
        queryFn: async () => await patchLightColor(lightId, rgb_color),
        enabled: false
    });
    return query;
};

