import React, { useState } from "react";

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
            <div />
        </div>
    );
};

export default Devices;
