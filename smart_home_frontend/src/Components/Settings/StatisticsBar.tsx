import GlassDiv from "../Shared/GlassDiv";
import { StatisticsEnum } from "./Statistics";
import StatisticsBarButton from "./StatisticsBarButton";
import "./StatisticsBar.scss"

type Props = {
    selectedPage: StatisticsEnum;
    setSelectedPage: React.Dispatch<React.SetStateAction<StatisticsEnum>>;
};

const StatisticsBar = (props: Props) => {
    return(
        <GlassDiv className="statbar-wrapper" roundTop={20} roundBottom={20}>
            <StatisticsBarButton
                active={ props.selectedPage == StatisticsEnum.Temperature}
                onClick={() => {
                    props.setSelectedPage(StatisticsEnum.Temperature)
                }}
                text="Temperature"
             />
             <StatisticsBarButton
                active={ props.selectedPage == StatisticsEnum.Humidity}
                onClick={() => {
                    props.setSelectedPage(StatisticsEnum.Humidity)
                }}
                text="Humidity"
             />
             <StatisticsBarButton
                active={ props.selectedPage == StatisticsEnum.PM10}
                onClick={() => {
                    props.setSelectedPage(StatisticsEnum.PM10)
                }}
                text="PM10"
             />
             <StatisticsBarButton
                active={ props.selectedPage == StatisticsEnum.PM2dot5}
                onClick={() => {
                    props.setSelectedPage(StatisticsEnum.PM2dot5)
                }}
                text="PM2.5"
             />
        </GlassDiv>
    );
}

export default StatisticsBar;