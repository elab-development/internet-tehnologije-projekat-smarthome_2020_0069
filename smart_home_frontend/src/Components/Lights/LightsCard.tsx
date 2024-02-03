import React, { useState } from "react";
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

type Props = {
    roomName: string;
    color: string;
    state: boolean; 
};

const LightsCard = (props: Props) => {

    function convertToHexColor(colorString: string) {
        const r = parseInt(colorString.substring(0, 3), 10);
        const g = parseInt(colorString.substring(3, 6), 10);
        const b = parseInt(colorString.substring(6, 9), 10);
    
        const hexColor = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    
        return hexColor;
    }
    

    const [turnedOn, setTurnedOn] = useState(props.state);
    const [lightColor, setLightColor] = useState(convertToHexColor(props.color));
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <GlassDiv className="thermostat-card">
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(true)}
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
                        onChanged={() => {}}
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
