import React from "react";
import { Pages } from "../../Pages/Devices";
import GlassDiv from "../Shared/GlassDiv";
import PageButton from "./PageButton";
import { MdDeviceThermostat } from "react-icons/md";
import { BsFillSpeakerFill } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa6";
import { BiSolidCctv } from "react-icons/bi";
import { MdAir } from "react-icons/md";
import "./Sidebar.scss";

type Props = {
    selectedPage: Pages;
    setSelectedPage: React.Dispatch<React.SetStateAction<Pages>>;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = (props: Props) => {
    return (
        <GlassDiv className="sidebar">
            <PageButton
                active={props.selectedPage == Pages.Thermostat}
                onClick={() => {
                    if(props.selectedPage !== Pages.Thermostat){
                        props.setSelectedPage(Pages.Thermostat)
                        props.setPageNumber(1);
                        props.setHaveMore(true);
                    }
                }}
                icon={<MdDeviceThermostat />}
            />
            <PageButton
                active={props.selectedPage == Pages.Speaker}
                onClick={() =>{
                    if(props.selectedPage !== Pages.Speaker){
                        props.setSelectedPage(Pages.Speaker)
                        props.setPageNumber(1);
                        props.setHaveMore(true);
                    }
                }}
                icon={<BsFillSpeakerFill />}
            />
            <PageButton
                active={props.selectedPage == Pages.Light}
                onClick={() => {
                    if(props.selectedPage !== Pages.Light){
                        props.setSelectedPage(Pages.Light)
                        props.setPageNumber(1);
                        props.setHaveMore(true);
                    }
                }}
                icon={<FaLightbulb />}
            />
            <PageButton
                active={props.selectedPage == Pages.Camera}
                onClick={() => {
                    if(props.selectedPage !== Pages.Camera){
                        props.setSelectedPage(Pages.Camera)
                        props.setPageNumber(1);
                        props.setHaveMore(true);
                    }
                }}
                icon={<BiSolidCctv />}
            />
            <PageButton
                active={props.selectedPage == Pages.Purifier}
                onClick={() => {
                    if(props.selectedPage !== Pages.Purifier){
                        props.setSelectedPage(Pages.Purifier)
                        props.setPageNumber(1);
                        props.setHaveMore(true);
                    }
                }}
                icon={<MdAir />}
            />
        </GlassDiv>
    );
};

export default Sidebar;
