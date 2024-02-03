import React, { useEffect, useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import SpeakerCard from "./SpeakerCard";
import "./Speakers.scss";
import { useGetAccessToken, useGetTracksFromSearch } from "../../Api/Spotify/SpotifyApi";
import { Speaker } from "../../Api/Speakers/SpeakersApi.types";
import { useGetSpeakers } from "../../Api/Speakers/SpeakersApi";

type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>
};

const Speakers = (props: Props) => {

    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const { data, refetch, isLoading, isError, isRefetching } = useGetSpeakers(props.pageNumber, 6)

    useEffect(() => {
        refetch();
        if (!isLoading && !isError) {
            props.setHaveMore(true)
            const newSpeakers: Speaker[] = [];
            for (let index = 0; index < data?.speakers.length!; index++) {
                const newSpeaker: Speaker = {
                    device_id: data?.speakers[index].device_id ?? "",
                    bass: data?.speakers[index].bass ?? 0,
                    place: data?.speakers[index].place ?? "",
                    state: data?.speakers[index].state ?? "",
                    battery: data?.speakers[index].battery ?? 0,
                    volume: data?.speakers[index].volume ?? 0,
                    song: data?.speakers[index].song ?? "",
                    author: data?.speakers[index].author ?? "",
                    image_url: data?.speakers[index].image_url ?? ""
                }
                newSpeakers.push(newSpeaker);
            }
            setSpeakers(newSpeakers);
        }
        if (data?.speakers.length === 0) {
            props.setHaveMore(false);
        }
    }, [data, isError, isLoading, props.pageNumber])

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Speakers"
                addButtonText="Add speakers"
                onAddClick={() => { }}
            />

            {
                isLoading ?
                    (
                        <div className="circular-progress">

                        </div>
                    )
                    :
                    (
                        <div className="cards">

                            {
                                speakers.map((t, i) => (
                                    <SpeakerCard
                                        key={i}
                                        songTitle={t.song}
                                        roomName={t.place}
                                        albumCover={t.image_url}
                                        author={t.author}
                                        batteryPercent={t.battery}
                                        volumePercent={t.volume}
                                    />
                                ))
                            }
                        </div>
                    )
            }
        </GlassDiv>
    );
};

export default Speakers;
