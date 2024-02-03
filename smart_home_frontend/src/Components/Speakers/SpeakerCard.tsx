import React, { useEffect, useState } from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import { FaBatteryFull } from "react-icons/fa6";
import { BsFillVolumeDownFill } from "react-icons/bs";
import "./SpeakerCard.scss";
import IconButton from "../Shared/IconButton";
import { FaStop } from "react-icons/fa6";
import { IoIosSkipBackward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { IoIosSkipForward } from "react-icons/io";
import { PiPlaylistFill } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";
import { useQuery } from "@tanstack/react-query";
import { useGetTracksFromSearch } from "../../Api/SpotifyApi";
import { SpotifySong } from "../../Api/SpotifyApi.types";
import SongCard from "./SongCard";

type Props = {
    roomName: string;
    albumCover: string;
    songTitle: string;
    author: string;
    batteryPercent: number;
    volumePercent: number;
};

const SpeakerCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchSongModalOpen, setisSearchSongModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [tracksList, setTrackList] = useState<SpotifySong[]>([]);

    const {
        data: tracks,
        error: tracksError,
        isLoading: tracksLoading,
        isFetching,
        refetch,
    } = useGetTracksFromSearch(searchText);

    const handleClick = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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
                            <FaBatteryFull />
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
                    <IconButton
                        background={false}
                        icon={<FaStop />}
                        onClick={() => {}}
                    />
                    <IconButton
                        background={false}
                        icon={<IoIosSkipBackward />}
                        onClick={() => {}}
                    />
                    <IconButton
                        background={true}
                        icon={<FaPlay />}
                        onClick={() => {}}
                    />
                    <IconButton
                        background={false}
                        icon={<IoIosSkipForward />}
                        onClick={() => {}}
                    />
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
                        onChanged={() => {}}
                        value={10}
                        unit="%"
                    />
                    <Slider
                        label="Bass"
                        max={100}
                        min={0}
                        onChanged={() => {}}
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
