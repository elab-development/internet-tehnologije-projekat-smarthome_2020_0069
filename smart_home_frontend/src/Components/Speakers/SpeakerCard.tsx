import React, { useEffect, useState } from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import { FaBatteryFull, FaBatteryHalf, FaBatteryEmpty } from "react-icons/fa6";
import { BsFillVolumeDownFill } from "react-icons/bs";
import "./SpeakerCard.scss";
import IconButton from "../Shared/IconButton";
import { FaStop } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { PiPlaylistFill } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useGetTracksFromSearch } from "../../Api/Spotify/SpotifyApi";
import { SpotifySong } from "../../Api/Spotify/SpotifyApi.types";
import SongCard from "./SongCard";
import { Speaker, SpeakersModel } from "../../Api/Speakers/SpeakersApi.types";
import { usePatchSpeakerSong, usePatchSpeakerState } from "../../Api/Speakers/SpeakersApi";

type Props = {
    roomName: string;
    albumCover: string;
    songTitle: string;
    author: string;
    batteryPercent: number;
    volumePercent: number;
    isPlaying: boolean;
    deviceId: string;
    refechSongs: () => Promise<QueryObserverResult<SpeakersModel, Error>>;
};

const SpeakerCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchSongModalOpen, setisSearchSongModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isPlaying, setIsPlaying] = useState<boolean>(props.isPlaying);
    const [tracksList, setTrackList] = useState<SpotifySong[]>([]);
    const [song, setSong] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const {
        data: tracks,
        error: tracksError,
        isLoading: tracksLoading,
        isFetching,
        refetch,
    } = useGetTracksFromSearch(searchText);

    const {
        data: patchedStateSpeaker,
        error: patchedStateError,
        isLoading: patchedStateLoading,
        refetch: patchedStateRefetch,
    } = usePatchSpeakerState(props.deviceId, isPlaying ? "running" : "stop");

    const {
        data: patchedTrackData,
        error: patchedTrackError,
        isLoading: patchedTrackLoading,
        isFetching: patchedTrackIsFetching,
        refetch: patchedTrackIsRefetch,
    } = usePatchSpeakerSong(props.deviceId, song, author, imageUrl);

    const handleClick = async () => {
        await refetch();
    };

    const handleSongClick = async (track: SpotifySong) => {
        setSong(track.name);
        setAuthor(track.author);
        setImageUrl(track.image);
    };

    useEffect(() => {
        const fetchData = async () => {
            await patchedTrackIsRefetch();
            props.refechSongs();
            setisSearchSongModalOpen(false);
        };

        if (song && author && imageUrl) {
            fetchData();
        }
    }, [song, author, imageUrl, patchedTrackIsRefetch])

    useEffect(() => {
        const fetchData = async () => {
            await patchedStateRefetch();
        };
        fetchData();
    }, [isPlaying])

    useEffect(() => {
        if (!tracksLoading && !tracksError) {
            const newSongs: SpotifySong[] = [];
            for (let index = 0; index < tracks?.tracks.items.length!; index++) {
                const newSong: SpotifySong = {
                    name: tracks?.tracks.items[index].name ?? "",
                    author:
                        tracks?.tracks.items[index].album.artists[0].name ?? "",
                    duration: tracks?.tracks.items[index].duration_ms ?? 0,
                    image:
                        tracks?.tracks.items[index].album.images[0].url ?? "",
                };
                newSongs.push(newSong);
            }
            setTrackList([...tracksList, ...newSongs]);
        }
    }, [tracksLoading, isFetching, refetch]);

    return (
        <GlassDiv className="speaker-card">
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(!isModalOpen)}
            />
            <div className="card-body">
                <div className="playing-info">
                    <div className="song">
                        <img src={props.albumCover} alt="album cover" />
                        <div className="song-info">
                            <div className="title">{props.songTitle}</div>
                            <div className="author">{props.author}</div>
                        </div>
                    </div>
                    <div className="speaker-info">
                        <div className="battery">
                            {
                                props.batteryPercent <= 100 && props.batteryPercent > 75 ?
                                    (<FaBatteryFull />
                                    )
                                    : props.batteryPercent <= 75 && props.batteryPercent > 30 ?
                                        (<FaBatteryHalf />
                                        ) : (<FaBatteryEmpty />
                                        )
                            }
                            <div className="percent">
                                {props.batteryPercent}%
                            </div>
                        </div>
                        <div className="volume">
                            <BsFillVolumeDownFill />
                            <div className="percent">
                                {props.volumePercent}%
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playing-controls">
                    {/* <IconButton
                        background={false}
                        icon={<FaStop />}
                        onClick={() => { }}
                    /> */}
                    <div style={{ width: '40px' }}>

                    </div>

                    <div className="play-pause-button">
                        {
                            isPlaying ?
                                (
                                    <IconButton
                                        background={true}
                                        icon={<FaPause />}
                                        onClick={() => {
                                            setIsPlaying(false)
                                        }}
                                    />
                                ) :
                                (
                                    <IconButton
                                        background={true}
                                        icon={<FaPlay />}
                                        onClick={() => {
                                            setIsPlaying(true)
                                        }}
                                    />
                                )
                        }

                    </div>
                    <IconButton
                        background={false}
                        icon={<PiPlaylistFill />}
                        onClick={() => {
                            setisSearchSongModalOpen(true);
                        }}
                    />
                </div>
            </div>
            <PopupModal
                isOpen={isSearchSongModalOpen}
                onRequestClose={() => setisSearchSongModalOpen(false)}
                title="Search for songs"
                width="25vw"
                height="70vh"
            >
                <div className="search-song-modal-content">
                    <input
                        type="text"
                        placeholder={`Search music`}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        onClick={handleClick}
                        disabled={tracksLoading}
                        style={{ border: "none" }}
                    >
                        <IoMdSearch />
                    </button>

                    {tracksList.length == 0 ? (
                        <div className="empty-tracks">
                            {tracksList.toString()}
                            Search for songs, list is empty
                        </div>
                    ) : (
                        <div className="list-view-wrapper">
                            <div className="list-view">
                                {tracksList.map((track, index) => (
                                    <SongCard
                                        key={index}
                                        onSongClick={async () => {
                                            handleSongClick(track);
                                        }}
                                        author={track.author}
                                        duration={track.duration}
                                        image={track.image}
                                        name={track.name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </PopupModal>
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Speaker settings"
            >
                <div className="speaker-modal-content">
                    <TextBox placeholder="Room name" />
                    <Slider
                        label="Volume"
                        max={100}
                        min={0}
                        onChanged={() => { }}
                        value={10}
                        unit="%"
                    />
                    <Slider
                        label="Bass"
                        max={100}
                        min={0}
                        onChanged={() => { }}
                        value={10}
                        unit="%"
                    />
                    <PrimaryButton button_value="Save" />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default SpeakerCard;
