import React, { useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import LightsCard from "./LightsCard";
import "./Lights.scss";

type Props = {};

const Lights = (props: Props) => {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Lights"
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <div className="cards">
                <LightsCard roomName="Living room" onSettingsClick={() => {}} />
            </div>
        </GlassDiv>
    );
};

export default Lights;
