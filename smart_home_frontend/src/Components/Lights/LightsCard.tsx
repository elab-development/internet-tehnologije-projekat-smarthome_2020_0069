import React, { useState } from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import "./LightsCard.scss";
import { FaLightbulb } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaEyeDropper } from "react-icons/fa6";

type Props = {
    roomName: string;
    onSettingsClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const LightsCard = (props: Props) => {
    const [turnedOn, setTurnedOn] = useState(true);
    const [lightColor, setLightColor] = useState("#E7E03A");
    return (
        <GlassDiv className="thermostat-card">
            <CardHeader
                roomName={props.roomName}
                onClick={props.onSettingsClick}
            />
            <div className="card-body">
                <button
                    className="light-switch"
                    onClick={() => setTurnedOn(!turnedOn)}
                    style={{
                        backgroundColor: turnedOn ? lightColor : "#9e9e9e",
                    }}
                >
                    {turnedOn ? <FaLightbulb /> : <FaRegLightbulb />}
                </button>
                <div className="color-picker">
                    <FaEyeDropper />
                    <input
                        type="color"
                        className="color-picker-input"
                        value={lightColor}
                        onChange={(e) => {
                            setLightColor(e.target.value);
                        }}
                    />
                </div>
            </div>
        </GlassDiv>
    );
};

export default LightsCard;
