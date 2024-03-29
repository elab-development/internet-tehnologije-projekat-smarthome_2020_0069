import React, { useEffect, useState } from "react";
import { Pages } from "../../Pages/Devices";
import PageButton from "./PageButton";
import { IoPerson } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import "./ProfileButtons.scss";
import GlassDiv from "../Shared/GlassDiv";
import PopupModal from "../Shared/Modals/PopupModal";
import PrimaryButton from "../Shared/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "../../Api/Auth/AuthApi";

type Props = {
    selectedPage: Pages;
    setSelectedPage: React.Dispatch<React.SetStateAction<Pages>>;
};

const ProfileButtons = (props: Props) => {
    let [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [refetched, setRefetched] = useState(false);
    const { data, error, isLoading, refetch, isRefetching } = useSignOut();

    useEffect(() => {
        if (!isLoading && !isRefetching && refetched) {
            if (data != undefined) {
                localStorage.removeItem("access_token");
                navigate("/auth");
            }
        }
    }, [isLoading, isRefetching]);

    return (
        <GlassDiv className="profile-buttons">
            <PageButton
                active={props.selectedPage == Pages.Profile}
                onClick={() => props.setSelectedPage(Pages.Profile)}
                icon={<IoPerson />}
            />
            <PageButton
                active={false}
                onClick={() => {
                    setIsModalOpen(true);
                }}
                icon={<FaSignOutAlt />}
            />
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Sign out confirmation"
                width="20vw"
                height="35vh"
            >
                <div className="exit-modal-content">
                    Are you sure that you want to sign out?
                    <div className="exit-modal-buttons">
                        <PrimaryButton
                            button_value="Yes"
                            height="60px"
                            width="100px"
                            onClick={() => {
                                refetch();
                                setRefetched(true);
                            }}
                        />
                        <PrimaryButton
                            button_value="No"
                            height="60px"
                            width="100px"
                            color="rgb(233, 145, 96)"
                            background="white"
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default ProfileButtons;
