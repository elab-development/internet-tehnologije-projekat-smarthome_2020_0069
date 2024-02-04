import React, { useState } from "react";
import { IoIosBed } from "react-icons/io";
import { FaSliders } from "react-icons/fa6";
import IconButton from "../Shared/IconButton";
import "./CardHeader.scss";

type Props = {
    roomName: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const CardHeader = (props: Props) => {
    const [userRole, setUserRole] = useState(localStorage.getItem("role_name"));

    return (
        <div className="card-header">
            <IoIosBed />
            <div className="room-name">{props.roomName}</div>
            {userRole == "ADMIN" || userRole == "USER" ? (
                <IconButton
                    background={true}
                    onClick={props.onClick}
                    icon={<FaSliders />}
                />
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default CardHeader;
