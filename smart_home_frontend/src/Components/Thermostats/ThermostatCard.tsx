import React, { useEffect, useState } from "react";
import CardHeader from "../Devices/CardHeader";
import CircularProgressBar from "../Shared/CircularProgressBar";
import GlassDiv from "../Shared/GlassDiv";
import { MdDeviceThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./ThermostatCard.scss";
import PopupModal from "../Shared/Modals/PopupModal";
import PrimaryButton from "../Shared/PrimaryButton";
import TextBox from "../Shared/TextBox";
import { useEditThermostat } from "../../Api/Thermostats/ThermostatApi";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ThermostatsModel } from "../../Api/Thermostats/ThermostatApi.types";

type Props = {
    thermostatId: string;
    roomName: string;
    temperature: number;
    humidity: number;
    timer?: number;
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<ThermostatsModel, Error>>;
};

const ThermostatCard = (props: Props) => {
    let [roomName, setRoomName] = useState(props.roomName);
    let [timer, setTimer] = useState(props.timer?.toString());
    let [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        data,
        refetch: editRefetch,
        isLoading,
        isError,
    } = useEditThermostat(props.thermostatId, roomName);

    useEffect(() => {
        if (!isLoading && !isError) {
            if (data != undefined) {
                props.refetch();
                setErrorMessage("");
                setIsModalOpen(false);
            }
        } else if (isError) {
            setErrorMessage("Error creating thermostat!");
        }
    }, [data, isError]);

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
                    <TextBox
                        placeholder="Room name"
                        value={roomName}
                        onChanged={(e) => {
                            setRoomName(e.target.value);
                        }}
                    />
                    <TextBox
                        placeholder="Timer"
                        value={timer}
                        onChanged={(e) => {
                            setTimer(e.target.value);
                        }}
                    />
                    <PrimaryButton
                        button_value="Save"
                        onClick={() => editRefetch()}
                    />
                    <div className="error-message-thermostat">
                        {errorMessage}
                    </div>
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default ThermostatCard;
