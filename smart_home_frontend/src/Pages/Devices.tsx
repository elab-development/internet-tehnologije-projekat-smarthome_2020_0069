import React, { useEffect, useState } from "react";
import Cameras from "../Components/Cameras/Cameras";
import Pagination from "../Components/Devices/Pagination";
import ProfileButtons from "../Components/Devices/ProfileButtons";
import Sidebar from "../Components/Devices/Sidebar";
import Lights from "../Components/Lights/Lights";
import Purifiers from "../Components/Purifiers/Purifiers";
import Speakers from "../Components/Speakers/Speakers";
import Thermostats from "../Components/Thermostats/Thermostats";
import Settings from "../Components/Settings/Settings";
import "./Devices.scss";
import { useNavigate } from "react-router-dom";

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
    let [pageNumber, setPageNumber] = useState<number>(1);
    let [haveMore, setHaveMore] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access_token") == null) {
            navigate("/auth");
        }
    }, []);

    let renderPage = () => {
        switch (selectedPage) {
            case Pages.Thermostat:
                return <Thermostats
                    setHaveMore={setHaveMore}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber} />;
            case Pages.Purifier:
                return <Purifiers
                    setHaveMore={setHaveMore}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber} />;
            case Pages.Speaker:
                return <Speakers
                    setHaveMore={setHaveMore}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber} />;
            case Pages.Camera:
                return <Cameras />;
            case Pages.Light:
                return <Lights
                    setHaveMore={setHaveMore}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber} />;
            case Pages.Profile:
                return <Settings />;
        }
    };

    return (
        <div className="devices-container">

            {selectedPage !== Pages.Profile ?
                (<Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    haveMore={haveMore}
                    setHaveMore={setHaveMore}
                />) : (
                    <div>
                    </div>

                )
            }
            <ProfileButtons
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
            />
            <Sidebar
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setHaveMore={setHaveMore}
                setPageNumber={setPageNumber}
            />
            {renderPage()}
        </div>
    );
};

export default Devices;
