import React, { useEffect, useState } from "react";
import { useCreatePurifier, useGetPurifiers } from "../../Api/Purifiers/PurifierApi";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import PopupModal from "../Shared/Modals/PopupModal";
import PrimaryButton from "../Shared/PrimaryButton";
import TextBox from "../Shared/TextBox";
import PurifierCard from "./PurifierCard";
import "./Purifiers.scss";
import { Purifier } from "../../Api/Purifiers/PurifierApi.types";

type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>

};

const Purifiers = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [ purifier, setPurifier ] = useState<Purifier[]>([]);

    const { data, refetch, isLoading, isError } = useGetPurifiers(props.pageNumber, 6)
    useEffect(() => {
        refetch();
        if(!isLoading && !isError){
            props.setHaveMore(true)
            const newPurifiers: Purifier[] = [];
            console.log(data)
            for (let index = 0; index < data?.air_purifiers.length!; index++) {
                const newPurifier: Purifier = {
                    device_id: data?.air_purifiers[index].device_id??"",
                    filter: data?.air_purifiers[index].filter??0,
                    pm10: data?.air_purifiers[index].pm10??0,
                    pm1_0: data?.air_purifiers[index].pm1_0??0,
                    pm2_5: data?.air_purifiers[index].pm2_5??0,
                    place: data?.air_purifiers[index].place??""
                }
                newPurifiers.push(newPurifier);
            }
            setPurifier(newPurifiers);
        }
        if(data?.air_purifiers.length === 0){
            props.setHaveMore(false);
        }
    }, [data, isError, isLoading, props.pageNumber])


    const { data: crateData, refetch: createRefetch, isLoading: createIsLoading, isError: createIsError } = useCreatePurifier(
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
        if (!createIsLoading && !createIsError) {
            if (crateData != undefined) {
                refetch();
                setErrorMessage("");
            }
        } else if (createIsError) {
            setErrorMessage("Invalid credentials!");
        }
    }, [crateData, createIsError]);

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Purifiers"
                addButtonText="Add purifiers"
                onAddClick={() => {
                    setIsModalOpen(true);
                }}
            />
            {
                isLoading ?
                    (
                        <div className="circular-progress">

                        </div>
                    )
                    :
                    (
                        <div className="cards">

                            {
                                purifier.map((t, i) => (
                                    <PurifierCard
                                        key={i}
                                        pm10={t.pm10}
                                        pm25={t.pm2_5}
                                        roomName={t.place}
                                    />
                                ))
                            }
                        </div>
                    )
            }
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
                        onClick={() => createRefetch()}
                    />
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default Purifiers;
