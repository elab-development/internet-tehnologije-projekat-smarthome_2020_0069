import React, { useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import LightsCard from "./LightsCard";
import "./Lights.scss";

type Props = {};

const Lights = (props: Props) => {
    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Lights"
                addButtonText="Add lights"
                onAddClick={() => {}}
            />
            <div className="cards">
                <LightsCard roomName="Living room" />
            </div>
        </GlassDiv>
    );
};

export default Lights;
