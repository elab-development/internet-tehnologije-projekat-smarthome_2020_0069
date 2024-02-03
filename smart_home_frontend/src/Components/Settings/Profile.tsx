import React, { useEffect, useState } from "react";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Hyperlink from "../Shared/Hyperlink";
import "./Profile.scss";
import PopupModal from "../Shared/Modals/PopupModal";
import { useGetCurrentUser, useResetPassword } from "../../Api/UserApi";

type Props = {};

const Profile = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { data } = useGetCurrentUser();
    const {
        data: resetData,
        refetch: refetchReset,
        isLoading: isLoadingReset,
        isError: isErrorReset,
    } = useResetPassword(currentPassword, newPassword);

    useEffect(() => {
        if (data != undefined) {
            setName(data.name);
            setSurname(data.surname);
            setUsername(data.username);
        }
    }, [data]);

    useEffect(() => {
        if (!isErrorReset && !isLoadingReset) {
            if (resetData != undefined) {
                setErrorMessage("");
                setIsModalOpen(false);
            }
        } else if (isErrorReset) {
            setErrorMessage("Password is not correct!");
        }
    }, [resetData, isErrorReset, isLoadingReset]);
    return (
        <div className="profile-wrapper">
            <div className="profile-name">Profile</div>
            <TextBox value={name} readonly={true} />
            <TextBox value={surname} readonly={true} />
            <TextBox value={username} readonly={true} />
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
                    <TextBox
                        placeholder="Old password"
                        value={currentPassword}
                        onChanged={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextBox
                        placeholder="New password"
                        value={newPassword}
                        onChanged={(e) => setNewPassword(e.target.value)}
                    />
                    <PrimaryButton
                        button_value="Save"
                        onClick={() => refetchReset()}
                    />
                    <div className="error-message">{errorMessage}</div>
                </div>
            </PopupModal>
        </div>
    );
};

export default Profile;
