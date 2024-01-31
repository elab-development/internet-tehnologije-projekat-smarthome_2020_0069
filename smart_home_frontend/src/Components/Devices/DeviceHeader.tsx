import React from "react";
import { IoMdSearch } from "react-icons/io";
import GlassDiv from "../Shared/GlassDiv";
import "./DeviceHeader.scss";

type Props = {
    title: string;
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const DeviceHeader = (props: Props) => {
    return (
        <GlassDiv className="device-header" roundBottom={0}>
            <div className="device-title">{props.title}</div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={`Search ${props.title}`}
                    value={props.searchText}
                    onChange={(e) => props.setSearchText(e.target.value)}
                />
                <IoMdSearch />
            </div>
        </GlassDiv>
    );
};

export default DeviceHeader;
