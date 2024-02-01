import React, { useState } from "react";
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
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";

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
                        onClick={() => {}}
                    />
                </div>
            </div>
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
