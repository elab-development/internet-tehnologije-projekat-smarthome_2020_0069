import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { time } from "console";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import {
    CreateThermostatResponse,
    Thermostat,
    ThermostatsModel,
} from "./ThermostatApi.types";

const getThermostats = async (
    page_number: number,
    page_size: number
): Promise<ThermostatsModel> => {
    const response = await axios.get<ThermostatsModel>(
        `${SMART_HOME_API_BASE_URL}device/thermostat/get_thermostats`,
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

export const useGetThermostats = (page_number: number, page_size: number) => {
    const query = useQuery<ThermostatsModel, Error>({
        queryKey: ["get-thermostats-key"],
        queryFn: async () => await getThermostats(page_number, page_size),
    });
    return query;
};

const createThermostat = async (
    location_id: string,
    place: string,
    state: string,
    temperature: number,
    humidity: number,
    timer: number
): Promise<CreateThermostatResponse> => {
    const response = await axios.post<CreateThermostatResponse>(
        `${SMART_HOME_API_BASE_URL}device/thermostat`,
        {
            thermostat: {
                location_id,
                place,
                state,
                temperature,
                humidity,
                timer,
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

export const useCreateThermostat = (
    location_id: string,
    place: string,
    state: string,
    temperature: number,
    humidity: number,
    timer: number
) => {
    const query = useQuery<CreateThermostatResponse, Error>({
        queryKey: ["thermostat-key"],
        queryFn: async () =>
            await createThermostat(
                location_id,
                place,
                state,
                temperature,
                humidity,
                timer
            ),
        enabled: false,
        retry: 0,
    });
    return query;
};

const editThermostat = async (
    thermostat_id: string,
    timer: number
): Promise<CreateThermostatResponse> => {
    const response = await axios.patch<CreateThermostatResponse>(
        `${SMART_HOME_API_BASE_URL}device/thermostat/${thermostat_id}`,
        {
            thermostat: {
                timer,
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

export const useEditThermostat = (thermostat_id: string, timer: number) => {
    const query = useQuery<CreateThermostatResponse, Error>({
        queryKey: ["thermostat-edit-key"],
        queryFn: async () => await editThermostat(thermostat_id, timer),
        enabled: false,
        retry: 0,
    });
    return query;
};
