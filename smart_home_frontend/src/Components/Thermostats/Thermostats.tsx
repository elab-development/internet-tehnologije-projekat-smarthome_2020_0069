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
                <ThermostatCard />
                <ThermostatCard />
                <ThermostatCard />
                <ThermostatCard />
                <ThermostatCard />
            </div>
        </GlassDiv>
    );
};

export default Thermostats;
