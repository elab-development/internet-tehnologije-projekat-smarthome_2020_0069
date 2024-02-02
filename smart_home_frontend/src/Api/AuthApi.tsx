import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "./ApiConfig";
import { LoginResponse } from "./AuthApi.types";

const login = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
        `${SMART_HOME_API_BASE_URL}auth/sign_in`,
        {
            username,
            password,
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
};

export const useLogin = (username: string, password: string) => {
    const query = useQuery<LoginResponse, Error>({
        queryKey: ["login-key"],
        queryFn: async () => await login(username, password),
        enabled: false,
        retry: 0,
    });
    return query;
};
