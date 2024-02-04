import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";

const editDevice = async (device_id: string, place: string): Promise<any> => {
    const response = await axios.patch<any>(
        `${SMART_HOME_API_BASE_URL}device/${device_id}`,
        {
            device: {
                place,
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

export const useEditDevice = (device_id: string, place: string) => {
    const query = useQuery<any, Error>({
        queryKey: ["thermostat-edit-key"],
        queryFn: async () => await editDevice(device_id, place),
        enabled: false,
        retry: 0,
    });
    return query;
};

const deleteDevice = async (device_id: string): Promise<any> => {
    const response = await axios.delete<any>(
        `${SMART_HOME_API_BASE_URL}device/${device_id}`,
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

export const useDeleteDevice = (device_id: string) => {
    const query = useQuery<any, Error>({
        queryKey: ["thermostat-edit-key"],
        queryFn: async () => await deleteDevice(device_id),
        enabled: false,
        retry: 0,
    });
    return query;
};
