export interface Thermostat {
    device_id: string;
    humidity: number;
    place: string;
    state: string;
    temperature: number;
    timer?: number;
}

export interface ThermostatsModel {
    thermostats: Thermostat[];
}

export interface CreateThermostatResponse {
    thermostat: {
        state: string;
        device_id: string;
        place: string;
        location_id: string;
        temperature: number;
        timer: number;
        humidity: number;
    };
}
