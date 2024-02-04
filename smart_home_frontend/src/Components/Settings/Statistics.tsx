import { useEffect, useState } from "react"
import "./Statistics.scss"
import StatisticsBar from './StatisticsBar';
import ColumnBarGraph from "./ColumnBarGraph";
import { useGetPurifiers } from "../../Api/Purifiers/PurifierApi";
import { useGetThermostats } from "../../Api/Thermostats/ThermostatApi";

export enum StatisticsEnum {
    Temperature,
    Humidity,
    PM10,
    PM2dot5
};

type Props = {

};

const Statistics = (props: Props) => {

    let [selectedPage, setSelectedPage] = useState<StatisticsEnum>(StatisticsEnum.Temperature)
    let [pm10Data, setPm10Data] = useState<Array<[string, any]>>([]);
    let [pm25Data, setPm25Data] = useState<Array<[string, any]>>([]);
    let [tempData, setTempData] = useState<Array<[string, any]>>([]);
    let [humData, setHumData] = useState<Array<[string, any]>>([]);


    const { data: purifierData, isLoading: purifierIsLoading, isError: purifierIsError } = useGetPurifiers(1, 6);
    const { data: thermostatData, isLoading: thermostatIsLoading, isError: thermostatIsError, } = useGetThermostats(1, 6);

    useEffect(() => {
        if (!purifierIsLoading && !purifierIsError) {
            const newDatapm10: Array<[string, any]> = [["Room", "pm10"]];
            for (let index = 0; index < purifierData?.air_purifiers.length!; index++) {
                const newPurifier: [string, number] = [
                    purifierData?.air_purifiers[index].place ?? "",
                    purifierData?.air_purifiers[index].pm10 ?? 0
                ]
                newDatapm10.push(newPurifier);
            }
            setPm10Data(newDatapm10);
            const newDatapm25: Array<[string, any]> = [["Room", "pm2.5"]];
            for (let index = 0; index < purifierData?.air_purifiers.length!; index++) {
                const newPurifier: [string, number] = [
                    purifierData?.air_purifiers[index].place ?? "",
                    purifierData?.air_purifiers[index].pm2_5 ?? 0
                ]
                newDatapm25.push(newPurifier);
            }
            setPm25Data(newDatapm25);

        }
    }, [purifierData, purifierIsError, purifierIsLoading])


    useEffect(() => {
        if (!thermostatIsLoading && !thermostatIsError) {
            const newDataTemp: Array<[string, any]> = [["Room", "Temperature"]];
            for (let index = 0; index < thermostatData?.thermostats.length!; index++) {
                const newThermostat: [string, number] = [
                    thermostatData?.thermostats[index].place ?? "",
                    thermostatData?.thermostats[index].temperature ?? 0
                ]
                newDataTemp.push(newThermostat);
            }
            setTempData(newDataTemp);
            const newDataHum: Array<[string, any]> = [["Room", "Humidity"]];
            for (let index = 0; index < thermostatData?.thermostats.length!; index++) {
                const newThermostat: [string, number] = [
                    thermostatData?.thermostats[index].place ?? "",
                    thermostatData?.thermostats[index].humidity ?? 0
                ]
                newDataHum.push(newThermostat);
            }
            setHumData(newDataHum);

        }
    }, [thermostatData, thermostatIsError, thermostatIsLoading])
    // const data1 = [
    //     ["Element", "Density"],
    //     ["Copper", 8.94],
    //     ["Silver", 10.4],
    //     ["Gold", 19.3],
    //     ["Platinum", 21.45],
    //     ["Platinum", 21.45],
    //     ["Platinum", 21.45],
    //     ["Platinum", 21.45]
    // ];

    return (
        <div className='stat-wrapper'>
            <div className='stat-name'>
                Statistics
            </div>
            <div className="stat-bar">
                <StatisticsBar selectedPage={selectedPage} setSelectedPage={setSelectedPage}></StatisticsBar>
            </div>
            <div className="stat-graph">
                <ColumnBarGraph data={
                    selectedPage === StatisticsEnum.PM10 ? pm10Data :
                        selectedPage === StatisticsEnum.PM2dot5 ? pm25Data :
                            selectedPage === StatisticsEnum.Humidity ? humData : tempData
                } />
            </div>
        </div>
    );
}

export default Statistics;