import { useState } from "react"
import "./Statistics.scss"
import StatisticsBar from './StatisticsBar';
import ColumnBarGraph from "./ColumnBarGraph";

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

    const data = [
        ["Element", "Density"],
        ["Copper", 8.94],
        ["Silver", 10.4],
        ["Gold", 19.3],
        ["Platinum", 21.45],
        ["Platinum", 21.45],
        ["Platinum", 21.45],
        ["Platinum", 21.45]
    ];

    return (
        <div className='stat-wrapper'>
            <div className='stat-name'>
                Statistics
            </div>
            <div className="stat-bar">
                <StatisticsBar selectedPage={selectedPage} setSelectedPage={setSelectedPage}></StatisticsBar>
            </div>
            <div className="stat-graph">
                <ColumnBarGraph data={data} />
            </div>
        </div>
    );
}

export default Statistics;