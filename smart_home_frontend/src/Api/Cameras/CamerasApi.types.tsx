export interface Camera {
    device_id: string;
    state: string;
    place: string;
    autofocus: boolean;
    flash: boolean;
    iso: number;
    resolution: number;
    zoom: number;
}

export interface CamerasModel {
    cameras: Camera[];
}

export interface CreateCameraResponse {
    camera: {
        state: string;
        device_id: string;
        place: string;
        location_id: string;
        autofocus: boolean;
        flash: boolean;
        iso: number;
        resolution: number;
        zoom: number;
        timer: number;
    };
}

export interface CameraPhotos {
    paths: string[];
}
