import React, { useEffect, useState } from "react";
import { useCreateCamera, useGetCameras } from "../../Api/Cameras/CamerasApi";
import { Camera } from "../../Api/Cameras/CamerasApi.types";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import PopupModal from "../Shared/Modals/PopupModal";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";
import TextBox from "../Shared/TextBox";
import CameraCard from "./CameraCard";
import "./Cameras.scss";

type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cameras = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [flash, setFlash] = useState(false);
    const [autofocus, setAutofocus] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [iso, setIso] = useState(1200);
    const [resolution, setResolution] = useState("");
    const [timer, setTimer] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cameras, setCameras] = useState<Camera[]>([]);
    const { data, refetch, isLoading, isError, isRefetching } = useGetCameras(
        props.pageNumber,
        6
    );

    useEffect(() => {
        refetch();
        if (!isLoading && !isError) {
            props.setHaveMore(true);
            const newCameras: Camera[] = [];
            for (let index = 0; index < data?.cameras.length!; index++) {
                const newCamera: Camera = {
                    device_id: data?.cameras[index].device_id ?? "",
                    flash: data?.cameras[index].flash ?? false,
                    place: data?.cameras[index].place ?? "",
                    state: data?.cameras[index].state ?? "",
                    zoom: data?.cameras[index].zoom ?? 1,
                    autofocus: data?.cameras[index].autofocus ?? true,
                    iso: data?.cameras[index].iso ?? 1200,
                    resolution: data?.cameras[index].resolution ?? 720,
                };
                newCameras.push(newCamera);
            }
            setCameras(newCameras);
        }
        if (data != undefined && data.cameras.length < 6) {
            props.setHaveMore(false);
        }
    }, [data, isError, isLoading, props.pageNumber]);

    const {
        data: createData,
        refetch: createRefetch,
        isLoading: createIsLoading,
        isError: createIsError,
    } = useCreateCamera(
        localStorage.getItem("location_id")!,
        roomName,
        "Running",
        autofocus,
        flash,
        iso,
        parseInt(resolution),
        zoom,
        parseInt(timer)
    );

    useEffect(() => {
        if (!createIsLoading && !createIsError) {
            if (createData != undefined) {
                refetch();
                setErrorMessage("");
            }
        } else if (createIsError) {
            setErrorMessage("Error creating purifier!");
        }
    }, [createData, createIsError]);

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Cameras"
                addButtonText="Add cameras"
                onAddClick={() => {
                    setIsModalOpen(true);
                }}
            />
            {isLoading ? (
                <div className="circular-progress"></div>
            ) : (
                <div className="cards">
                    {cameras.map((t, i) => (
                        <CameraCard
                            key={i}
                            roomName={t.place}
                            cameraId={t.device_id}
                        />
                    ))}
                </div>
            )}
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Create camera"
            >
                <div className="camera-modal-content">
                    <TextBox
                        placeholder="Room name"
                        value={roomName}
                        onChanged={(e) => setRoomName(e.target.value)}
                    />
                    <TextBox
                        placeholder="Timer"
                        value={timer}
                        onChanged={(e) => setTimer(e.target.value)}
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
                            onChange={(e) => setFlash(e.target.checked)}
                        ></input>
                        <label htmlFor="flash">Flash</label>
                    </div>
                    <div className="zoom-checkbox">
                        <input
                            type="checkbox"
                            name="autofocus"
                            checked={autofocus}
                            onChange={(e) => setAutofocus(e.target.checked)}
                        ></input>
                        <label htmlFor="autofocus">Autofocus</label>
                    </div>
                    <PrimaryButton
                        button_value="Save"
                        onClick={() => createRefetch()}
                    />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default Cameras;
