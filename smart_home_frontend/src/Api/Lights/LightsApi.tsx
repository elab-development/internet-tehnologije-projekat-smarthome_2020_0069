import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import { LightsModel } from "./LightsApi.types";


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