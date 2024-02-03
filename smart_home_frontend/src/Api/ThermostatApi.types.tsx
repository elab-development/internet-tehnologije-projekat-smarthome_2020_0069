export interface Thermostat {
    device_id: string,
    humidity: number,
    place: string,
    state: string,
    temperature: number,
    timer?: number
}

export interface ThermostatsModel{
    thermostats: Thermostat[]
}