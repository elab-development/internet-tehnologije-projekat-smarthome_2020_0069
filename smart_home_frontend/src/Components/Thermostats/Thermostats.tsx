import React, { useEffect, useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import ThermostatCard from "./ThermostatCard";
import "./Thermostats.scss";
import {
    Thermostat,
    ThermostatsModel,
} from "../../Api/Thermostats/ThermostatApi.types";
import {
    useCreateThermostat,
    useGetThermostats,
} from "../../Api/Thermostats/ThermostatApi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";

type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>;
};

const Thermostats = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [timer, setTimer] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [thermostats, setThermostats] = useState<Thermostat[]>([]);
    const { data, refetch, isLoading, isError, isRefetching } =
        useGetThermostats(props.pageNumber, 6);

    useEffect(() => {
        refetch();
        if (!isLoading && !isError) {
            props.setHaveMore(true);
            const newThermostats: Thermostat[] = [];
            for (let index = 0; index < data?.thermostats.length!; index++) {
                const newThermostat: Thermostat = {
                    device_id: data?.thermostats[index].device_id ?? "",
                    humidity: data?.thermostats[index].humidity ?? 0,
                    place: data?.thermostats[index].place ?? "",
                    state: data?.thermostats[index].state ?? "",
                    temperature: data?.thermostats[index].temperature ?? 0,
                    timer: data?.thermostats[index].timer ?? 0,
                };
                newThermostats.push(newThermostat);
            }
            setThermostats(newThermostats);
        }
        if (data != undefined && data.thermostats.length < 6) {
            props.setHaveMore(false);
        }
    }, [data, isError, isLoading, props.pageNumber]);

    const {
        data: createData,
        refetch: createRefetch,
        isLoading: createIsLoading,
        isError: createIsError,
    } = useCreateThermostat(
        localStorage.getItem("location_id")!,
        roomName,
        "Running",
        getRandomInt(0, 30),
        getRandomInt(10, 70),
        Number.parseInt(timer)
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
            setErrorMessage("Error creating thermostat!");
        }
    }, [createData, createIsError]);

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Thermostats"
                addButtonText="Add thermostats"
                onAddClick={() => {
                    setIsModalOpen(true);
                }}
            />
            {isLoading ? (
                <div className="circular-progress"></div>
            ) : (
                <div className="cards">
                    {thermostats.map((t, i) => (
                        <ThermostatCard
                            key={i}
                            thermostatId={t.device_id}
                            roomName={t.place}
                            temperature={t.temperature}
                            humidity={t.humidity}
                            timer={t.timer}
                            refetch={refetch}
                        />
                    ))}
                </div>
            )}
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Create thermostat"
            >
                <div className="thermostat-modal-content">
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
                    <PrimaryButton
                        button_value="Add"
                        onClick={() => createRefetch()}
                    />
                    <div className="error-message-thermostat">
                        {errorMessage}
                    </div>
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default Thermostats;
