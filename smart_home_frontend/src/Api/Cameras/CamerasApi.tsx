import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SMART_HOME_API_BASE_URL } from "../ApiConfig";
import {
    CreateCameraResponse,
    CamerasModel,
    Camera,
    CameraPhotos,
} from "./CamerasApi.types";

const getCameras = async (
    page_number: number,
    page_size: number
): Promise<CamerasModel> => {
    const response = await axios.get<CamerasModel>(
        `${SMART_HOME_API_BASE_URL}device/camera/get_cameras`,
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

export const useGetCameras = (page_number: number, page_size: number) => {
    const query = useQuery<CamerasModel, Error>({
        queryKey: ["get-cameras-key"],
        queryFn: async () => await getCameras(page_number, page_size),
    });
    return query;
};

const getPhotos = async (camera_id: string): Promise<CameraPhotos> => {
    const response = await axios.get<CameraPhotos>(
        `${SMART_HOME_API_BASE_URL}device/camera/pictures/${camera_id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            withCredentials: true,
        }
    );
    return response.data;
};

export const useGetPhotos = (camera_id: string) => {
    const query = useQuery<CameraPhotos, Error>({
        queryKey: [`get-photos-${camera_id}-key`],
        queryFn: async () => await getPhotos(camera_id),
    });
    return query;
};

const createCamera = async (
    location_id: string,
    place: string,
    state: string,
    autofocus: boolean,
    flash: boolean,
    iso: number,
    resolution: number,
    zoom: number,
    timer: number
): Promise<CreateCameraResponse> => {
    const response = await axios.post<CreateCameraResponse>(
        `${SMART_HOME_API_BASE_URL}device/camera`,
        {
            camera: {
                location_id,
                place,
                state,
                autofocus,
                flash,
                iso,
                resolution,
                zoom,
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

    if (response.data != undefined) {
        for (let i = 0; i < 5; i++) {
            let randPhoto = await getRandomBase64Photo();
            console.log(randPhoto);
            await capturePhoto(response.data.camera.device_id, randPhoto);
            console.log(randPhoto);
        }
    }
    return response.data;
};

export const useCreateCamera = (
    location_id: string,
    place: string,
    state: string,
    autofocus: boolean,
    flash: boolean,
    iso: number,
    resolution: number,
    zoom: number,
    timer: number
) => {
    const query = useQuery<CreateCameraResponse, Error>({
        queryKey: ["cameras-create-key"],
        queryFn: async () =>
            await createCamera(
                location_id,
                place,
                state,
                autofocus,
                flash,
                iso,
                resolution,
                zoom,
                timer
            ),
        enabled: false,
        retry: 0,
    });
    return query;
};

const capturePhoto = async (camera_id: string, image: string): Promise<any> => {
    const response = await axios.post<any>(
        `${SMART_HOME_API_BASE_URL}device/camera/capture/${camera_id}`,
        {
            image,
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

const getRandomBase64Photo = async (): Promise<string> => {
    return axios
        .get("https://picsum.photos/1920/1080", {
            responseType: "arraybuffer",
        })
        .then((response) => {
            let image = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
            return image;
        });
};

const editCamera = async (
    camera_id: string,
    resolution: string,
    iso: number,
    zoom: number,
    flash: boolean,
    autofocus: boolean
): Promise<any> => {
    const response = await axios.patch<any>(
        `${SMART_HOME_API_BASE_URL}device/camera/${camera_id}`,
        {
            purifier: {
                resolution,
                iso,
                zoom,
                flash,
                autofocus,
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

export const useEditCamera = (
    camera_id: string,
    resolution: string,
    iso: number,
    zoom: number,
    flash: boolean,
    autofocus: boolean
) => {
    const query = useQuery<any, Error>({
        queryKey: ["camera-edit-key"],
        queryFn: async () =>
            await editCamera(
                camera_id,
                resolution,
                iso,
                zoom,
                flash,
                autofocus
            ),
        enabled: false,
        retry: 0,
    });
    return query;
};
