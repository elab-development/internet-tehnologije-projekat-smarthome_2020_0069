import React, { useEffect, useState } from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import { FaEye } from "react-icons/fa";
import "./CameraCard.scss";
import IconButton from "../Shared/IconButton";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";
import { useEditCamera, useGetPhotos } from "../../Api/Cameras/CamerasApi";
import { SMART_HOME_API_BASE_URL } from "../../Api/ApiConfig";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDeleteDevice, useEditDevice } from "../../Api/Device/DeviceApi";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { CamerasModel } from "../../Api/Cameras/CamerasApi.types";

type Props = {
    roomName: string;
    cameraId: string;
    resolution: string;
    iso: number;
    zoom: number;
    flash: boolean;
    autofocus: boolean;
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<CamerasModel, Error>>;
};

const CameraCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const { data, isLoading, isError } = useGetPhotos(props.cameraId);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomName, setRoomName] = useState(props.roomName);
    const [resolution, setResolution] = useState(props.resolution);
    const [iso, setIso] = useState(props.iso);
    const [zoom, setZoom] = useState(props.zoom);
    const [flash, setFlash] = useState(props.flash);
    const [autofocus, setAutofocus] = useState(props.autofocus);

    const {
        data: editData,
        refetch: editRefetch,
        isLoading: editLoading,
        isError: editError,
        isRefetching: editRefetching,
    } = useEditCamera(props.cameraId, resolution, iso, zoom, flash, autofocus);

    const {
        data: editDeviceData,
        refetch: editDeviceRefetch,
        isLoading: editDeviceLoading,
        isError: editDeviceError,
    } = useEditDevice(props.cameraId, roomName);

    const {
        data: deleteDeviceData,
        refetch: deleteDeviceRefetch,
        isLoading: deleteDeviceLoading,
        isError: deleteDeviceError,
        isRefetching: deleteDeviceRefetching,
    } = useDeleteDevice(props.cameraId);

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
        if (!isLoading && !isError) {
            if (data != undefined) {
                setImages(data.paths);
            }
        } else {
            setImages([]);
        }
    }, [data, isLoading]);
    return (
        <GlassDiv className="camera-card">
            <div className="latest-image-shadow"></div>
            {images.length > 0 && (
                <img
                    className="latest-image"
                    src={`${SMART_HOME_API_BASE_URL}${images[0]}`}
                    alt="camera image"
                />
            )}
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(true)}
            />
            <div className="view-images">
                <IconButton
                    background={true}
                    icon={<FaEye />}
                    onClick={() => {
                        setIsGalleryOpen(true);
                    }}
                />
            </div>
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Camera settings"
                deleteButton={true}
                onDelete={() => {
                    deleteDeviceRefetch();
                }}
            >
                <div className="camera-modal-content">
                    <TextBox
                        placeholder="Room name"
                        value={roomName}
                        onChanged={(e) => setRoomName(e.target.value)}
                    />
                    <Slider
                        label="ISO"
                        unit=""
                        min={200}
                        max={5000}
                        onChanged={(e) => {
                            setIso(e.target.valueAsNumber);
                        }}
                        value={iso}
                    />
                    <TextBox
                        placeholder="Resolution"
                        value={resolution}
                        onChanged={(e) => setResolution(e.target.value)}
                    />
                    <Slider
                        label="Zoom"
                        unit=""
                        min={1}
                        max={5}
                        onChanged={(e) => {
                            setZoom(e.target.valueAsNumber);
                        }}
                        value={zoom}
                    />
                    <div className="flash-checkbox">
                        <input
                            type="checkbox"
                            name="flash"
                            checked={flash}
                            onChange={(e) => {
                                setFlash(e.target.checked);
                            }}
                        ></input>
                        <label htmlFor="flash">Flash</label>
                    </div>
                    <div className="zoom-checkbox">
                        <input
                            type="checkbox"
                            name="zoom"
                            checked={autofocus}
                            onChange={(e) => {
                                setAutofocus(e.target.checked);
                            }}
                        ></input>
                        <label htmlFor="zoom">Autofocus</label>
                    </div>
                    <PrimaryButton
                        button_value="Save"
                        onClick={() => {
                            editRefetch();
                            editDeviceRefetch();
                        }}
                    />
                </div>
            </PopupModal>
            <PopupModal
                isOpen={isGalleryOpen}
                onRequestClose={() => setIsGalleryOpen(false)}
                title="Gallery"
            >
                <div className="gallery-modal">
                    <img
                        src={`${SMART_HOME_API_BASE_URL}${images[currentImage]}`}
                    />
                    <div className="previous-image">
                        <IconButton
                            background={true}
                            icon={<IoIosArrowBack />}
                            onClick={() => {
                                if (currentImage == 0) {
                                    setCurrentImage(images.length - 1);
                                } else {
                                    setCurrentImage(currentImage - 1);
                                }
                            }}
                        />
                    </div>
                    <div className="next-image">
                        <IconButton
                            background={true}
                            icon={<IoIosArrowForward />}
                            onClick={() => {
                                if (currentImage == images.length - 1) {
                                    setCurrentImage(0);
                                } else {
                                    setCurrentImage(currentImage + 1);
                                }
                            }}
                        />
                    </div>
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default CameraCard;
