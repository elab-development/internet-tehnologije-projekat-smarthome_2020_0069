import React, { useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import ThermostatCard from "./ThermostatCard";
import "./Thermostats.scss";

type Props = {};

const Thermostats = (props: Props) => {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Thermostats"
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <div className="cards">
                <ThermostatCard
                    roomName="Living room"
                    onSettingsClick={() => {}}
                    temperature={20}
                    humidity={50}
                />
                <ThermostatCard
                    roomName="Bedroom"
                    onSettingsClick={() => {}}
                    temperature={25}
                    humidity={40}
                />
                <ThermostatCard
                    roomName="Bathroom"
                    onSettingsClick={() => {}}
                    temperature={16}
                    humidity={70}
                />
                <ThermostatCard
                    roomName="Living room"
                    onSettingsClick={() => {}}
                    temperature={20}
                    humidity={50}
                />
            </div>
        </GlassDiv>
    );
};

export default Thermostats;
