import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import { PurifierResponse, PurifiersModel } from "./PurifierApi.types";

const getPurifiers = async (page_number: number, page_size: number): Promise<PurifiersModel> => {
    const response = await axios.get<PurifiersModel>(
        `${SMART_HOME_API_BASE_URL}device/air_purifier/get_air_purifiers`,
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

export const useGetPurifiers = (page_number: number, page_size: number) => {
    const query = useQuery<PurifiersModel, Error>({
        queryKey: ["get-purifiers-key"],
        queryFn: async () => await getPurifiers(page_number, page_size),
    });
    return query;
};



const createPurifier = async (
    location_id: string,
    place: string,
    state: string,
    filter: number,
    pm10: number,
    pm2_5: number,
    pm1_0: number
): Promise<PurifierResponse> => {
    const response = await axios.post<PurifierResponse>(
        `${SMART_HOME_API_BASE_URL}device/air_purifier`,
        {
            air_purifier: {
                location_id,
                place,
                state,
                filter,
                pm10,
                pm2_5,
                pm1_0,
            },
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );

    return response.data;
};

export const useCreatePurifier = (
    location_id: string,
    place: string,
    state: string,
    filter: number,
    pm10: number,
    pm2_5: number,
    pm1_0: number
) => {
    const query = useQuery<PurifierResponse, Error>({
        queryKey: ["purifier-key"],
        queryFn: async () =>
            await createPurifier(
                location_id,
                place,
                state,
                filter,
                pm10,
                pm2_5,
                pm1_0
            ),
        enabled: false,
        retry: 0,
    });
    return query;
};
