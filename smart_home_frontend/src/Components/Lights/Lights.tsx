import React, { useEffect, useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import LightsCard from "./LightsCard";
import "./Lights.scss";
import { Light } from "../../Api/Lights/LightsApi.types";
import { useCreateLight, useGetLights } from "../../Api/Lights/LightsApi";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";

type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>;
};

const Lights = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [lightLevel, setLightLevel] = useState(3);
    const [errorMessage, setErrorMessage] = useState("");
    const [lights, setLights] = useState<Light[]>([]);
    const { data, refetch, isLoading, isError, isRefetching } = useGetLights(
        props.pageNumber,
        6
    );

    useEffect(() => {
        refetch();
        if (!isLoading && !isError) {
            props.setHaveMore(true);
            const newLights: Light[] = [];
            for (let index = 0; index < data?.lights.length!; index++) {
                const newLight: Light = {
                    device_id: data?.lights[index].device_id ?? "",
                    light_level: data?.lights[index].light_level ?? 0,
                    place: data?.lights[index].place ?? "",
                    state: data?.lights[index].state ?? "",
                    light_state: data?.lights[index].light_state ?? false,
                    rgb_color: data?.lights[index].rgb_color ?? "",
                };
                newLights.push(newLight);
            }
            setLights(newLights);
        }
        if (data != undefined && data.lights.length < 6) {
            props.setHaveMore(false);
        }
    }, [data, isError, isLoading, props.pageNumber]);

    const {
        data: createData,
        refetch: createRefetch,
        isLoading: createIsLoading,
        isError: createIsError,
    } = useCreateLight(
        localStorage.getItem("location_id")!,
        roomName,
        "Running",
        lightLevel,
        getRandomInt(0, 256).toString().padStart(3, "0") +
            getRandomInt(0, 256).toString().padStart(3, "0") +
            getRandomInt(0, 256).toString().padStart(3, "0")
    );

    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    useEffect(() => {
        if (!createIsLoading && !createIsError) {
            if (createData != undefined) {
                refetch();
                setErrorMessage("");
                setIsModalOpen(false);
            }
        } else if (createIsError) {
            setErrorMessage("Error creating purifier!");
        }
    }, [createData, createIsError]);

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Lights"
                addButtonText="Add lights"
                onAddClick={() => {
                    setIsModalOpen(true);
                }}
            />

            {isLoading ? (
                <div className="circular-progress"></div>
            ) : (
                <div className="cards">
                    {lights.map((t, i) => (
                        <LightsCard
                            key={i}
                            color={t.rgb_color}
                            state={t.light_state}
                            roomName={t.place}
                            deviceId={""}
                        />
                    ))}
                </div>
            )}
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Create light"
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
                            createRefetch();
                        }}
                    />
                    <div className="error-message-purifier">{errorMessage}</div>
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default Lights;
