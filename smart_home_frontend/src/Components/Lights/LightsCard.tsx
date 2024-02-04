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
import {
    useEditLight,
    useGetLightState,
    usePatchLightColor,
} from "../../Api/Lights/LightsApi";
import { useDeleteDevice, useEditDevice } from "../../Api/Device/DeviceApi";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { LightsModel } from "../../Api/Lights/LightsApi.types";

type Props = {
    roomName: string;
    color: string;
    state: boolean;
    deviceId: string;
    lightLevel: number;
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<LightsModel, Error>>;
};

const LightsCard = (props: Props) => {
    const [turnedOn, setTurnedOn] = useState(props.state);
    const [canRefetchTurnedOn, setCanRefetchTurnedOn] = useState(false);
    const [canRefetchLightColor, setCanRefetchLightColor] = useState(false);
    const [lightColor, setLightColor] = useState(props.color);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState(props.roomName);
    const [lightLevel, setLightLevel] = useState(props.lightLevel);

    const { data, error, isLoading, refetch, isRefetching } = useGetLightState(
        props.deviceId,
        turnedOn
    );
    const {
        data: patchColorData,
        error: patchColorError,
        isLoading: patchColorIsLoading,
        refetch: patchColorRefetch,
        isRefetching: patchColorIsRefetching,
    } = usePatchLightColor(props.deviceId, lightColor);

    const [errorMessage, setErrorMessage] = useState("");

    const {
        data: editData,
        refetch: editRefetch,
        isLoading: editLoading,
        isError: editError,
        isRefetching: editRefetching,
    } = useEditLight(props.deviceId, lightLevel);

    const {
        data: editDeviceData,
        refetch: editDeviceRefetch,
        isLoading: editDeviceLoading,
        isError: editDeviceError,
    } = useEditDevice(props.deviceId, roomName);

    const {
        data: deleteDeviceData,
        refetch: deleteDeviceRefetch,
        isLoading: deleteDeviceLoading,
        isError: deleteDeviceError,
        isRefetching: deleteDeviceRefetching,
    } = useDeleteDevice(props.deviceId);

    useEffect(() => {
        if (!editLoading && !editError && editData !== undefined) {
            props.refetch();
            setErrorMessage("");
            setIsModalOpen(false);
        } else if (editError) {
            setErrorMessage("Error editing thermostat!");
        }
    }, [editData, editLoading, editError, editRefetching]);

    useEffect(() => {
        if (!editDeviceLoading && !editDeviceError && editDeviceData !== undefined) {
            props.refetch();
            setErrorMessage("");
            setIsModalOpen(false);
        } else if (editDeviceError) {
            setErrorMessage("Error editing thermostat!");
        }
    }, [editDeviceData, editDeviceError]);

    useEffect(() => {
        if (!deleteDeviceLoading && !deleteDeviceError && deleteDeviceData !== undefined) {
            props.refetch();
            setErrorMessage("");
            setIsModalOpen(false);
        } else if (deleteDeviceError) {
            setErrorMessage("Error deleting thermostat!");
        }
    }, [deleteDeviceData, deleteDeviceError, deleteDeviceRefetching]);

    useEffect(() => {
        if (error) {
            setTurnedOn(!turnedOn);
        }
    }, [refetch, isRefetching]);

    useEffect(() => {
        if (canRefetchTurnedOn) {
            refetch();
        }
    }, [turnedOn]);

    useEffect(() => {
        if (canRefetchLightColor) {
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
                        setCanRefetchTurnedOn(true);
                        setTurnedOn(!turnedOn);
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
                            setCanRefetchLightColor(true);
                            setLightColor(e.target.value);
                        }}
                    />
                </div>
            </div>
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Light settings"
                deleteButton={true}
                onDelete={() => {
                    deleteDeviceRefetch();
                }}
            >
                <div className="light-modal-content">
                    <TextBox
                        placeholder="Room name"
                        value={roomName}
                        onChanged={(e) => setRoomName(e.target.value)}
                    />
                    <Slider
                        label="Light level"
                        max={5}
                        min={1}
                        onChanged={(e) => {
                            setLightLevel(e.target.valueAsNumber);
                        }}
                        value={lightLevel}
                        unit=""
                    />
                    <PrimaryButton
                        button_value="Save"
                        onClick={() => {
                            editRefetch();
                            editDeviceRefetch();
                        }}
                    />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default LightsCard;
