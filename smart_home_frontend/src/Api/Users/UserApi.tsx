import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import { User } from "./UserApi.types";

const getCurrentUser = async (): Promise<User> => {
    const response = await axios.get<User>(
        `${SMART_HOME_API_BASE_URL}user/id/${localStorage.getItem("user_id")}`,
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

export const useGetCurrentUser = () => {
    const query = useQuery<User, Error>({
        queryKey: ["user-key"],
        queryFn: async () => await getCurrentUser(),
        enabled: true,
        retry: 0,
    });
    return query;
};

const resetPassword = async (
    currentPassword: string,
    newPassword: string
): Promise<User> => {
    const response = await axios.post<User>(
        `${SMART_HOME_API_BASE_URL}user/update_password`,
        {
            current_password: currentPassword,
            user: {
                password: newPassword,
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

export const useResetPassword = (
    currentPassword: string,
    newPassword: string
) => {
    const query = useQuery<User, Error>({
        queryKey: ["user-key"],
        queryFn: async () => await resetPassword(currentPassword, newPassword),
        enabled: false,
        retry: 0,
    });
    return query;
};
