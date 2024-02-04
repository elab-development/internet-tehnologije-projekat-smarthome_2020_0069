import React, { useEffect, useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import SpeakerCard from "./SpeakerCard";
import "./Speakers.scss";
import {
    useGetAccessToken,
    useGetTracksFromSearch,
} from "../../Api/Spotify/SpotifyApi";
import { Speaker } from "../../Api/Speakers/SpeakersApi.types";
import {
    useCreateSpeaker,
    useGetSpeakers,
} from "../../Api/Speakers/SpeakersApi";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import Slider from "../Shared/Slider";
import PrimaryButton from "../Shared/PrimaryButton";

type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>;
};

const Speakers = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [volume, setVolume] = useState(0);
    const [bass, setBass] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const { data, refetch, isLoading, isError, isRefetching } = useGetSpeakers(
        props.pageNumber,
        6
    );
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        refetch();
    }, [props.pageNumber]);

    useEffect(() => {
        if (!isLoading && !isError) {
            props.setHaveMore(true);
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
                    image_url: data?.speakers[index].image_url ?? "",
                };
                newSpeakers.push(newSpeaker);
            }
            setSpeakers(newSpeakers);
            setRerender(!rerender);
        }
        if (data != undefined && data.speakers.length < 6) {
            props.setHaveMore(false);
        }
    }, [data, isError, isLoading, isRefetching]);

    const {
        data: createData,
        refetch: createRefetch,
        isLoading: createIsLoading,
        isError: createIsError,
    } = useCreateSpeaker(
        localStorage.getItem("location_id")!,
        roomName,
        "Running",
        volume,
        bass,
        getRandomInt(10, 100)
    );

    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    useEffect(() => {
        if (!createIsLoading && !createIsError) {
            if (createData != undefined) {
                refetch();
                setErrorMessage("");
                setIsModalOpen(false);
            }
        } else if (createIsError) {
            setErrorMessage("Error creating thermostat!");
        }
    }, [createData, createIsError]);

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Speakers"
                addButtonText="Add speakers"
                onAddClick={() => {
                    setIsModalOpen(true);
                }}
            />

            {isLoading ? (
                <div className="circular-progress"></div>
            ) : (
                rerender ||
                (!rerender && (
                    <div className="cards">
                        {speakers.map((t, i) => (
                            <SpeakerCard
                                key={i}
                                deviceId={t.device_id}
                                refechSongs={refetch}
                                isPlaying={t.state === "stop"}
                                songTitle={t.song}
                                roomName={t.place}
                                albumCover={t.image_url}
                                author={t.author}
                                batteryPercent={t.battery}
                                volumePercent={t.volume}
                                bass={t.bass}
                                refetch={refetch}
                                speakerId={t.device_id}
                            />
                        ))}
                    </div>
                ))
            )}

            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Create speaker"
            >
                <div className="speaker-modal-content">
                    <TextBox
                        placeholder="Room name"
                        value={roomName}
                        onChanged={(e) => setRoomName(e.target.value)}
                    />
                    <Slider
                        label="Volume"
                        max={100}
                        min={0}
                        onChanged={(e) => {
                            setVolume(e.target.valueAsNumber);
                        }}
                        value={volume}
                        unit="%"
                    />
                    <Slider
                        label="Bass"
                        max={100}
                        min={0}
                        onChanged={(e) => {
                            setBass(e.target.valueAsNumber);
                        }}
                        value={bass}
                        unit="%"
                    />
                    <PrimaryButton
                        button_value="Add"
                        onClick={() => createRefetch()}
                    />
                    <div className="error-message-speaker">{errorMessage}</div>
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default Speakers;
