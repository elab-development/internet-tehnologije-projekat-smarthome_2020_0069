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
                "Content-Type": "application/json",
            },
            withCredentials: true,
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

const register = async (
    name: string,
    surname: string,
    username: string,
    password: string,
    locationCode: string
): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
        `${SMART_HOME_API_BASE_URL}auth/register`,
        {
            user: {
                name,
                surname,
                username,
                password,
                invitation_code: locationCode,
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );

    return response.data;
};

export const useRegister = (
    name: string,
    surname: string,
    username: string,
    password: string,
    locationCode: string
) => {
    const query = useQuery<LoginResponse, Error>({
        queryKey: ["register-key"],
        queryFn: async () =>
            await register(name, surname, username, password, locationCode),
        enabled: false,
        retry: 0,
    });
    return query;
};

const signOut = async (): Promise<LoginResponse> => {
    const response = await axios.get<LoginResponse>(
        `${SMART_HOME_API_BASE_URL}auth/sign_out`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );

    return response.data;
};

// export const useSignOut = (
//     name: string,
//     surname: string,
//     username: string,
//     password: string,
//     locationCode: string
// ) => {
//     const query = useQuery<LoginResponse, Error>({
//         queryKey: ["signOut-key"],
//         queryFn: async () =>
//             await signOut,
//         enabled: false,
//         retry: 0,
//     });
//     return query;
// };
