import React, { useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import SpeakerCard from "./SpeakerCard";
import "./Speakers.scss";

type Props = {};

const Speakers = (props: Props) => {
    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Speakers"
                addButtonText="Add speakers"
                onAddClick={() => {}}
            />
            <div className="cards">
                <SpeakerCard
                    roomName="Living room"
                    albumCover="https://upload.wikimedia.org/wikipedia/en/b/b2/Coldplay_-_Viva_la_Vida_or_Death_and_All_His_Friends.png"
                    author="Coldplay"
                    songTitle="Violet hill"
                    batteryPercent={65}
                    volumePercent={45}
                />
                <SpeakerCard
                    roomName="Living room"
                    albumCover="https://upload.wikimedia.org/wikipedia/en/0/07/My_Head_Is_An_Animal.jpg"
                    author="Of Monsters and Man"
                    songTitle="Mountain sound"
                    batteryPercent={65}
                    volumePercent={45}
                />
            </div>
        </GlassDiv>
    );
};

export default Speakers;
