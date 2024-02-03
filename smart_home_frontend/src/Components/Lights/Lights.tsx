import React, { useEffect, useState } from "react";
import DeviceHeader from "../Devices/DeviceHeader";
import GlassDiv from "../Shared/GlassDiv";
import LightsCard from "./LightsCard";
import "./Lights.scss";
import { Light } from "../../Api/Lights/LightsApi.types";
import { useGetLights } from "../../Api/Lights/LightsApi";

type Props = {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>
};

const Lights = (props: Props) => {

    const [lights, setLights] = useState<Light[]>([])
    const { data, refetch, isLoading, isError, isRefetching } = useGetLights(props.pageNumber, 6)

    useEffect(() => {
        refetch();
        if (!isLoading && !isError) {
            props.setHaveMore(true)
            const newLights: Light[] = [];
            for (let index = 0; index < data?.lights.length!; index++) {
                const newLight: Light = {
                    device_id: data?.lights[index].device_id ?? "",
                    light_level: data?.lights[index].light_level ?? 0,
                    place: data?.lights[index].place ?? "",
                    state: data?.lights[index].state ?? "",
                    light_state: data?.lights[index].light_state ?? false,
                    rgb_color: data?.lights[index].rgb_color ?? "",
                }
                newLights.push(newLight);
            }
            setLights(newLights);
        }
        if (data?.lights.length === 0) {
            props.setHaveMore(false);
        }
    }, [data, isError, isLoading, props.pageNumber])


    return (
        <GlassDiv className="wrapper">
            <DeviceHeader
                title="Lights"
                addButtonText="Add lights"
                onAddClick={() => { }}
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
                                lights.map((t, i) => (
                                    <LightsCard
                                        key={i}
                                        color={t.rgb_color}
                                        state={t.light_state}
                                        roomName={t.place}
                                    />
                                ))
                            }
                        </div>
                    )
            }
        </GlassDiv>
    );
};

export default Lights;
