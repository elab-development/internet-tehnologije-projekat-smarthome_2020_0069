import React, { useState } from "react";
import Sidebar from "../Components/Devices/Sidebar";

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
        <div>
            <Sidebar
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
            />
        </div>
    );
};

export default Devices;
