import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import { SpeakersModel } from "./SpeakersApi.types";


const getSpeakers = async (page_number: number, page_size: number): Promise<SpeakersModel> => {
    const response = await axios.get<SpeakersModel>(
        `${SMART_HOME_API_BASE_URL}device/speaker/get_speakers`,
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

export const useGetSpeakers = (page_number: number, page_size: number) => {
    const query = useQuery<SpeakersModel, Error>({
        queryKey: ["get-speakers-key"],
        queryFn: async () => await getSpeakers(page_number, page_size),
    });
    return query;
};