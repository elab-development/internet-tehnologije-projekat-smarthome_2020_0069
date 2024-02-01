import React, { useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import CameraCard from "./CameraCard";
import "./Cameras.scss";

type Props = {};

const Cameras = (props: Props) => {
    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Cameras"
                addButtonText="Add cameras"
                onAddClick={() => {}}
            />
            <div className="cards">
                <CameraCard
                    roomName="Backyard"
                    image="https://149455152.v2.pressablecdn.com/wp-content/uploads/2022/05/T1SC_nightvision.png"
                />
            </div>
        </GlassDiv>
    );
};

export default Cameras;
