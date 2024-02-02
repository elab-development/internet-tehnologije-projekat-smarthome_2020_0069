import React, { useState } from "react";
import CardHeader from "../Devices/CardHeader";
import CircularProgressBar from "../Shared/CircularProgressBar";
import GlassDiv from "../Shared/GlassDiv";
import { MdDeviceThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./ThermostatCard.scss";
import PopupModal from "../Shared/Modals/PopupModal";
import PrimaryButton from "../Shared/PrimaryButton";
import TextBox from "../Shared/TextBox";

type Props = {
    roomName: string;
    temperature: number;
    humidity: number;
};

const ThermostatCard = (props: Props) => {
    let [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <GlassDiv className="thermostat-card">
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(true)}
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
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Thermostat settings"
            >
                <div className="thermostat-modal-content">
                    <TextBox placeholder="Room name" />
                    <TextBox placeholder="Timer" />
                    <PrimaryButton button_value="Save" />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default ThermostatCard;
