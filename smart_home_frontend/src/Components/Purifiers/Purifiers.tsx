import React, { useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import PurifierCard from "./PurifierCard";
import "./Purifiers.scss";

type Props = {};

const Purifiers = (props: Props) => {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Purifiers"
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <div className="cards">
                <PurifierCard
                    roomName="Living room"
                    onSettingsClick={() => {}}
                    pm10={36}
                    pm25={20}
                />
            </div>
        </GlassDiv>
    );
};

export default Purifiers;
