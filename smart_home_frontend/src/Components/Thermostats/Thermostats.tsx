import React, { useEffect, useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import ThermostatCard from "./ThermostatCard";
import "./Thermostats.scss";
import { ThermostatsModel } from "../../Api/ThermostatApi.types";
import { useGetThermostats } from "../../Api/ThermostatApi";
import CircularProgress from '@mui/material/CircularProgress';


type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
};

const Thermostats = (props: Props) => {

    const [thermostats, setThermostats] = useState<ThermostatsModel>()
    const {data, refetch, isLoading, isError, isRefetching} = useGetThermostats(props.pageNumber, 6)

    useEffect(() => {
        if(!isLoading && !isError){
            console.log(data)
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
                        <CircularProgress aria-label="Loading..."></CircularProgress>
                    </div>
                )
                :
                (
                    <div className="cards">
                <ThermostatCard
                    roomName="Living room"
                    temperature={20}
                    humidity={50}
                />
                <ThermostatCard
                    roomName="Bedroom"
                    temperature={25}
                    humidity={40}
                />
                <ThermostatCard
                    roomName="Bathroom"
                    temperature={16}
                    humidity={70}
                />
                <ThermostatCard
                    roomName="Living room"
                    temperature={20}
                    humidity={50}
                />
            </div>
                )
            }

            
        </GlassDiv>
    );
};

export default Thermostats;
