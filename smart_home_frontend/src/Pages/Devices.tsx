import React, { useState } from "react";
import Pagination from "../Components/Devices/Pagination";
import ProfileButtons from "../Components/Devices/ProfileButtons";
import Sidebar from "../Components/Devices/Sidebar";
import Thermostats from "../Components/Thermostats/Thermostats";
import "./Devices.scss";

export enum Pages {
    Thermostat,
    Speaker,
    Light,
    Camera,
    Purifier,
    Profile,
}
type Props = {};

const Devices = (props: Props) => {
    let [selectedPage, setSelectedPage] = useState<Pages>(Pages.Thermostat);

    return (
        <div className="devices-container">
            <Pagination />
            <ProfileButtons
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
            />
            <Sidebar
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
            />
            <Thermostats />
        </div>
    );
};

export default Devices;
