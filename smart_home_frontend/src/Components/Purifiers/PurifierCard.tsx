import React, { useState } from "react";
import CardHeader from "../Devices/CardHeader";
import CircularProgressBar from "../Shared/CircularProgressBar";
import GlassDiv from "../Shared/GlassDiv";
import { MdDeviceThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./PurifierCard.scss";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";

type Props = {
    roomName: string;
    pm10: number;
    pm25: number;
};

const PurifierCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <GlassDiv className="purifier-card">
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(true)}
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
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Purifier settings"
            >
                <div className="purifier-modal-content">
                    <TextBox placeholder="Room name" />
                    <TextBox placeholder="Timer" />
                    <PrimaryButton button_value="Save" />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default PurifierCard;
