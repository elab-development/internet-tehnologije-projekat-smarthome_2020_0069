import React, { useEffect, useRef, useState } from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import "./LightsCard.scss";
import { FaLightbulb } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaEyeDropper } from "react-icons/fa6";
import TextBox from "../Shared/TextBox";
import Slider from "../Shared/Slider";
import PrimaryButton from "../Shared/PrimaryButton";
import PopupModal from "../Shared/Modals/PopupModal";
import { useGetLightState, usePatchLightColor } from "../../Api/Lights/LightsApi";

type Props = {
    roomName: string;
    color: string;
    state: boolean;
    deviceId: string
};

const LightsCard = (props: Props) => {

    const [turnedOn, setTurnedOn] = useState(props.state);
    const [lightColor, setLightColor] = useState(props.color);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, error, isLoading, refetch, isRefetching } = useGetLightState(props.deviceId, turnedOn);
    const { data: patchColorData, error: patchColorError, isLoading: patchColorIsLoading, refetch: patchColorRefetch, isRefetching: patchColorIsRefetching } = usePatchLightColor(props.deviceId, lightColor);


    useEffect(() => {
        if (error) {
            setTurnedOn(!turnedOn);
        }
    }, [refetch, isRefetching]);

    useEffect(() => {
        if(turnedOn !== props.state){
            refetch();
        }
    }, [turnedOn]);

    useEffect(() => {
        if(lightColor!==props.color){
            patchColorRefetch();
        }
    }, [lightColor]);

    return (
        <GlassDiv className="thermostat-card">
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(true)}
            />
            <div className="card-body">
                <button
                    className="light-switch"
                    onClick={() => {
                        setTurnedOn(!turnedOn)
                    }}
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
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Light settings"
            >
                <div className="light-modal-content">
                    <TextBox placeholder="Room name" />
                    <Slider
                        label="Light level"
                        max={5}
                        min={1}
                        onChanged={() => { }}
                        value={3}
                        unit=""
                    />
                    <PrimaryButton button_value="Save" />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default LightsCard;
