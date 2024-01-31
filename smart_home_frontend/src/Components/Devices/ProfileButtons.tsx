import React from "react";
import { Pages } from "../../Pages/Devices";
import PageButton from "./PageButton";
import { IoPerson } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import "./ProfileButtons.scss";
import GlassDiv from "../Shared/GlassDiv";

type Props = {
    selectedPage: Pages;
    setSelectedPage: React.Dispatch<React.SetStateAction<Pages>>;
};

const ProfileButtons = (props: Props) => {
    return (
        <GlassDiv className="profile-buttons">
            <PageButton
                active={props.selectedPage == Pages.Profile}
                onClick={() => props.setSelectedPage(Pages.Profile)}
                icon={<IoPerson />}
            />
            <PageButton
                active={false}
                onClick={() => {}}
                icon={<FaSignOutAlt />}
            />
        </GlassDiv>
    );
};

export default ProfileButtons;
