export interface Speaker {
    device_id: string,
    bass: number,
    place: string,
    state: string,
    volume: number,
    battery: number,
    song: string,
    author: string,
    image_url: string
}

export interface SpeakersModel{
    speakers: Speaker[]
}