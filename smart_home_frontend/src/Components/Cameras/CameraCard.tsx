import React from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import { FaEye } from "react-icons/fa";
import "./CameraCard.scss";
import IconButton from "../Shared/IconButton";

type Props = {
    roomName: string;
    image: string;
    onSettingsClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const CameraCard = (props: Props) => {
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
                onClick={props.onSettingsClick}
            />
            <div className="view-images">
                <IconButton
                    background={true}
                    icon={<FaEye />}
                    onClick={() => {}}
                />
            </div>
        </GlassDiv>
    );
};

export default CameraCard;
