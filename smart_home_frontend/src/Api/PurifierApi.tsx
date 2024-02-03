import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "./ApiConfig";
import { PurifierResponse } from "./PurifierApi.types";

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
            location_id,
            place,
            state,
            filter,
            pm10,
            pm2_5,
            pm1_0,
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
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
