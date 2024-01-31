import React, { useState } from "react";
import Cameras from "../Components/Cameras/Cameras";
import Pagination from "../Components/Devices/Pagination";
import ProfileButtons from "../Components/Devices/ProfileButtons";
import Sidebar from "../Components/Devices/Sidebar";
import Lights from "../Components/Lights/Lights";
import Purifiers from "../Components/Purifiers/Purifiers";
import Speakers from "../Components/Speakers/Speakers";
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

    let renderPage = () => {
        switch (selectedPage) {
            case Pages.Thermostat:
                return <Thermostats />;
            case Pages.Purifier:
                return <Purifiers />;
            case Pages.Speaker:
                return <Speakers />;
            case Pages.Camera:
                return <Cameras />;
            case Pages.Light:
                return <Lights />;
        }
    };

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
            {renderPage()}
        </div>
    );
};

export default Devices;
