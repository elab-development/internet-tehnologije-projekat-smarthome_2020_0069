import React, { useEffect, useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import ThermostatCard from "./ThermostatCard";
import "./Thermostats.scss";
import { Thermostat, ThermostatsModel } from "../../Api/ThermostatApi.types";
import { useGetThermostats } from "../../Api/ThermostatApi";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
};

const Thermostats = (props: Props) => {

    const [thermostats, setThermostats] = useState<Thermostat[]>([])
    const {data, refetch, isLoading, isError, isRefetching} = useGetThermostats(props.pageNumber, 6)

    useEffect(() => {
        if(!isLoading && !isError){
            const newThermostats: Thermostat[] = [];
            for (let index = 0; index < data?.thermostats.length!; index++) {
                const newThermostat: Thermostat = {
                    device_id: data?.thermostats[index].device_id??"",
                    humidity: data?.thermostats[index].humidity??0,
                    place: data?.thermostats[index].place??"",
                    state: data?.thermostats[index].state??"",
                    temperature: data?.thermostats[index].temperature??0,
                    timer: data?.thermostats[index].timer??0
                }
                newThermostats.push(newThermostat);
            }
            setThermostats([...thermostats, ...newThermostats]);
        }
    }, [data, isError, isLoading, refetch, isRefetching])

    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Thermostats"
                addButtonText="Add thermostats"
                onAddClick={() => {}}
            />
            {
                isLoading?
                (
                    <div className="circular-progress">

                    </div>
                )
                :
                (
                    <div className="cards">

                        {
                            thermostats.map((t, i) => (
                                <ThermostatCard
                                    key={i}
                                    roomName={t.place}
                                    temperature={t.temperature}
                                    humidity={t.humidity}
                                />
                            ))
                        }
            </div>
                )
            }

            
        </GlassDiv>
    );
};

export default Thermostats;
