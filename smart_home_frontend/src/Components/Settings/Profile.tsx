import React, { useState } from "react";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Hyperlink from "../Shared/Hyperlink";
import "./Profile.scss";
import PopupModal from "../Shared/Modals/PopupModal";

type Props = {};

const Profile = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="profile-wrapper">
            <div className="profile-name">Profile</div>
            <TextBox value="Stefan" readonly={true} />
            <TextBox value="Jovanovic" readonly={true} />
            <TextBox value="stefanjo" readonly={true} />
            <PrimaryButton button_value="Update info" />
            <div className="footer-text">
                <div>{"Update password? "}</div>
                <Hyperlink
                    name="Click here"
                    onclick={() => setIsModalOpen(true)}
                ></Hyperlink>
            </div>
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Reset password"
            >
                <div className="password-modal-content">
                    <TextBox placeholder="New password" />
                    <TextBox placeholder="Confirm password" />
                    <PrimaryButton button_value="Save" />
                </div>
            </PopupModal>
        </div>
    );
};

export default Profile;
