import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "./ApiConfig";
import { ThermostatsModel } from "./ThermostatApi.types";

const getThermostats = async (page_number: number, page_size: number): Promise<ThermostatsModel> => {
    const response = await axios.get<ThermostatsModel>(
        `${SMART_HOME_API_BASE_URL}device/thermostat/get_thermostats`,
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

export const useGetThermostats = (page_number: number, page_size: number) => {
    const query = useQuery<ThermostatsModel, Error>({
        queryKey: ["get-thermostats-key"],
        queryFn: async () => await getThermostats(page_number, page_size),
    });
    return query;
};