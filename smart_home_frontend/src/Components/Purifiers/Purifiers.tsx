import React, { useEffect, useState } from "react";
import { useCreatePurifier } from "../../Api/PurifierApi";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import PopupModal from "../Shared/Modals/PopupModal";
import PrimaryButton from "../Shared/PrimaryButton";
import TextBox from "../Shared/TextBox";
import PurifierCard from "./PurifierCard";
import "./Purifiers.scss";

type Props = {};

const Purifiers = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { data, refetch, isLoading, isError } = useCreatePurifier(
        localStorage.getItem("location_id")!,
        roomName,
        "Running",
        getRandomInt(0, 100),
        getRandomInt(30, 60),
        getRandomInt(10, 50),
        getRandomInt(0, 30)
    );

    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    useEffect(() => {
        if (!isLoading && !isError) {
            if (data != undefined) {
                setErrorMessage("");
            }
        } else if (isError) {
            setErrorMessage("Invalid credentials!");
        }
    }, [data, isError]);

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Purifiers"
                addButtonText="Add purifiers"
                onAddClick={() => {
                    setIsModalOpen(true);
                }}
            />
            <div className="cards">
                <PurifierCard roomName="Living room" pm10={36} pm25={20} />
            </div>
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Create purifier"
            >
                <div className="purifier-modal-content">
                    <TextBox
                        placeholder="Room name"
                        value={roomName}
                        onChanged={(e) => setRoomName(e.target.value)}
                    />
                    <PrimaryButton
                        button_value="Add"
                        onClick={() => refetch()}
                    />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default Purifiers;
