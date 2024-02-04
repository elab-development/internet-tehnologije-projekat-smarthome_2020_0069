export interface Speaker {
    device_id: string;
    bass: number;
    place: string;
    state: string;
    volume: number;
    battery: number;
    song: string;
    author: string;
    image_url: string;
}

export interface SpeakersModel {
    speakers: Speaker[]
}

export interface DeviceModel {
    device: {
        id: string,
        location_id: string,
        place: string,
        state: string
    }   
}
export interface CreateSpeakerResponse {
    thermostat: {
        state: string;
        device_id: string;
        place: string;
        location_id: string;
        volume: number;
        bass: number;
        battery: number;
    };
}
