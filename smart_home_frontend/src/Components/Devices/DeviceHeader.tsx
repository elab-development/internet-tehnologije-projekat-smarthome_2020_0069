import React from "react";
import { IoMdSearch } from "react-icons/io";
import GlassDiv from "../Shared/GlassDiv";
import PrimaryButton from "../Shared/PrimaryButton";
import "./DeviceHeader.scss";

type Props = {
    title: string;
    addButtonText: string;
    onAddClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const DeviceHeader = (props: Props) => {
    return (
        <GlassDiv className="device-header" roundBottom={0}>
            <div className="device-title">{props.title}</div>
            <button className="add-button" onClick={props.onAddClick}>
                {props.addButtonText}
            </button>
            {/* <div className="search-bar">
                <input
                    type="text"
                    placeholder={`Search ${props.title}`}
                    value={props.searchText}
                    onChange={(e) => props.setSearchText(e.target.value)}
                />
                <IoMdSearch />
            </div> */}
        </GlassDiv>
    );
};

export default DeviceHeader;
