import React, { useState } from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import { FaEye } from "react-icons/fa";
import "./CameraCard.scss";
import IconButton from "../Shared/IconButton";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";

type Props = {
    roomName: string;
    image: string;
};

const CameraCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <GlassDiv className="camera-card">
            <div className="latest-image-shadow"></div>
            <img
                className="latest-image"
                src={props.image}
                alt="camera image"
            />
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(true)}
            />
            <div className="view-images">
                <IconButton
                    background={true}
                    icon={<FaEye />}
                    onClick={() => {}}
                />
            </div>
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Camera settings"
            >
                <div className="camera-modal-content">
                    <TextBox placeholder="Room name" />
                    <TextBox placeholder="Capture frequency" />
                    <Slider
                        label="ISO"
                        unit=""
                        min={200}
                        max={5000}
                        onChanged={() => {}}
                        value={1200}
                    />
                    <Slider
                        label="Resolution"
                        unit=""
                        min={1}
                        max={5}
                        onChanged={() => {}}
                        value={2}
                    />
                    <Slider
                        label="Zoom"
                        unit=""
                        min={1}
                        max={5}
                        onChanged={() => {}}
                        value={2}
                    />
                    <div className="flash-checkbox">
                        <input type="checkbox" name="flash"></input>
                        <label htmlFor="flash">Flash</label>
                    </div>
                    <div className="zoom-checkbox">
                        <input type="checkbox" name="zoom"></input>
                        <label htmlFor="zoom">Zoom</label>
                    </div>
                    <PrimaryButton button_value="Save" />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default CameraCard;
