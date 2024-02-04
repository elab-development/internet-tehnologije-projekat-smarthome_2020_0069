import React, { useEffect, useState } from "react";
import CardHeader from "../Devices/CardHeader";
import CircularProgressBar from "../Shared/CircularProgressBar";
import GlassDiv from "../Shared/GlassDiv";
import { MdDeviceThermostat } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./PurifierCard.scss";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import { useDeleteDevice, useEditDevice } from "../../Api/Device/DeviceApi";
import { useEditPurifier } from "../../Api/Purifiers/PurifierApi";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { SpeakersModel } from "../../Api/Speakers/SpeakersApi.types";
import { PurifiersModel } from "../../Api/Purifiers/PurifierApi.types";

type Props = {
    purifier_id: string;
    roomName: string;
    pm10: number;
    pm25: number;
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<PurifiersModel, Error>>;
};

const PurifierCard = (props: Props) => {
    const [roomName, setRoomName] = useState(props.roomName);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        data: editDeviceData,
        refetch: editDeviceRefetch,
        isLoading: editDeviceLoading,
        isError: editDeviceError,
        isRefetching,
    } = useEditDevice(props.purifier_id, roomName);

    const {
        data: deleteDeviceData,
        refetch: deleteDeviceRefetch,
        isLoading: deleteDeviceLoading,
        isError: deleteDeviceError,
        isRefetching: deleteDeviceRefetching,
    } = useDeleteDevice(props.purifier_id);

    useEffect(() => {
        if (!editDeviceLoading && !editDeviceError && editDeviceData !== undefined) {
            props.refetch();
            setErrorMessage("");
            setIsModalOpen(false);
        } else if (editDeviceError) {
            setErrorMessage("Error editing purifier!");
        }
    }, [editDeviceData, editDeviceError]);

    useEffect(() => {
        if (!deleteDeviceLoading && !deleteDeviceError && deleteDeviceData !== undefined) {
            props.refetch();
            setErrorMessage("");
            setIsModalOpen(false);
        } else if (deleteDeviceError) {
            setErrorMessage("Error deleting purifier!");
        }
    }, [deleteDeviceData, deleteDeviceError, deleteDeviceRefetching]);

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
                deleteButton={true}
                onDelete={() => {
                    deleteDeviceRefetch();
                }}
            >
                <div className="purifier-modal-content">
                    <TextBox
                        placeholder="Room name"
                        value={roomName}
                        onChanged={(e) => setRoomName(e.target.value)}
                    />
                    <PrimaryButton
                        button_value="Save"
                        onClick={() => {
                            editDeviceRefetch();
                        }}
                    />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default PurifierCard;
