export interface PurifierResponse {
    air_purifier: {
        state: string;
        filter: number;
        device_id: string;
        place: string;
        pm10: number;
        pm1_0: number;
        pm2_5: number;
        location_id: string;
    };
}

export interface Purifier {
    device_id: string,
    filter: number,
    pm10: number,
    pm1_0: number,
    pm2_5: number,
    place: string,
}

export interface PurifiersModel{
    air_purifiers: Purifier[]
}
