import React from "react";
import CardHeader from "../Devices/CardHeader";
import CircularProgressBar from "../Shared/CircularProgressBar";
import GlassDiv from "../Shared/GlassDiv";
import { MdDeviceThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./ThermostatCard.scss";

type Props = {
    roomName: string;
    temperature: number;
    humidity: number;
    onSettingsClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const ThermostatCard = (props: Props) => {
    return (
        <GlassDiv className="thermostat-card">
            <CardHeader
                roomName={props.roomName}
                onClick={props.onSettingsClick}
            />
            <div className="indicators">
                <CircularProgressBar
                    maxValue={50}
                    minValue={-50}
                    value={props.temperature}
                    unit="°C"
                    indicatorColor="#5AC858"
                    indicatorWidth={14}
                    size={160}
                    trackColor="rgba(122,122,122,0.45)"
                    trackWidth={14}
                >
                    <MdDeviceThermostat className="thermostat-icon" />
                </CircularProgressBar>
                <CircularProgressBar
                    maxValue={100}
                    minValue={0}
                    value={props.humidity}
                    unit="%"
                    indicatorColor="#C85858"
                    indicatorWidth={14}
                    size={160}
                    trackColor="rgba(122,122,122,0.45)"
                    trackWidth={14}
                >
                    <WiHumidity className="thermostat-icon" />
                </CircularProgressBar>
            </div>
        </GlassDiv>
    );
};

export default ThermostatCard;
