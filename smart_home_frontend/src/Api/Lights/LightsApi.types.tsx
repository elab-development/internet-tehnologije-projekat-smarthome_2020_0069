export interface Light {
    device_id: string,
    light_level: number,
    light_state: boolean,
    state: string,
    place: string,
    rgb_color: string
}

export interface LightsModel{
    lights: Light[]
}