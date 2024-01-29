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
};

const Sidebar = (props: Props) => {
    return (
        <GlassDiv className="sidebar">
            <PageButton
                active={props.selectedPage == Pages.Thermostat}
                onClick={() => props.setSelectedPage(Pages.Thermostat)}
                icon={<MdDeviceThermostat />}
            />
            <PageButton
                active={props.selectedPage == Pages.Speaker}
                onClick={() => props.setSelectedPage(Pages.Speaker)}
                icon={<BsFillSpeakerFill />}
            />
            <PageButton
                active={props.selectedPage == Pages.Light}
                onClick={() => props.setSelectedPage(Pages.Light)}
                icon={<FaLightbulb />}
            />
            <PageButton
                active={props.selectedPage == Pages.Camera}
                onClick={() => props.setSelectedPage(Pages.Camera)}
                icon={<BiSolidCctv />}
            />
            <PageButton
                active={props.selectedPage == Pages.Purifier}
                onClick={() => props.setSelectedPage(Pages.Purifier)}
                icon={<MdAir />}
            />
        </GlassDiv>
    );
};

export default Sidebar;
