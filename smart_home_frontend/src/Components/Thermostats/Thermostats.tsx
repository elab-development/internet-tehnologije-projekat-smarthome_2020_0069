import React, { useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import ThermostatCard from "./ThermostatCard";
import "./Thermostats.scss";

type Props = {};

const Thermostats = (props: Props) => {
    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Thermostats"
                addButtonText="Add thermostats"
                onAddClick={() => {}}
            />
            <div className="cards">
                <ThermostatCard
                    roomName="Living room"
                    temperature={20}
                    humidity={50}
                />
                <ThermostatCard
                    roomName="Bedroom"
                    temperature={25}
                    humidity={40}
                />
                <ThermostatCard
                    roomName="Bathroom"
                    temperature={16}
                    humidity={70}
                />
                <ThermostatCard
                    roomName="Living room"
                    temperature={20}
                    humidity={50}
                />
            </div>
        </GlassDiv>
    );
};

export default Thermostats;
