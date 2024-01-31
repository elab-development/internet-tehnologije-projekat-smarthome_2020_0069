import React from "react";
import CardHeader from "../Devices/CardHeader";
import CircularProgressBar from "../Shared/CircularProgressBar";
import GlassDiv from "../Shared/GlassDiv";
import { MdDeviceThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./PurifierCard.scss";

type Props = {
    roomName: string;
    pm10: number;
    pm25: number;
    onSettingsClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const PurifierCard = (props: Props) => {
    return (
        <GlassDiv className="purifier-card">
            <CardHeader
                roomName={props.roomName}
                onClick={props.onSettingsClick}
            />
            <div className="indicators">
                <CircularProgressBar
                    maxValue={100}
                    minValue={0}
                    value={props.pm10}
                    unit="μg/m³"
                    indicatorColor="#5AC858"
                    indicatorWidth={14}
                    size={160}
                    trackColor="rgba(122,122,122,0.45)"
                    trackWidth={14}
                >
                    <div className="title">PM10</div>
                </CircularProgressBar>
                <CircularProgressBar
                    maxValue={60}
                    minValue={0}
                    value={props.pm25}
                    unit="μg/m³"
                    indicatorColor="#C85858"
                    indicatorWidth={14}
                    size={160}
                    trackColor="rgba(122,122,122,0.45)"
                    trackWidth={14}
                >
                    <div className="title">PM2.5</div>
                </CircularProgressBar>
            </div>
        </GlassDiv>
    );
};

export default PurifierCard;
