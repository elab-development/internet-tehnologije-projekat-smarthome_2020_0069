import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../Components/Login/Signin";
import Signup from "../Components/Login/Signup";

export enum LoginPages {
    Signin,
    Signup,
}

type Props = {};

const Login = (props: Props) => {
    let [selectedPage, setSelectedPage] = useState<LoginPages>(
        LoginPages.Signin
    );
    let navigate = useNavigate();

    useEffect(() => {
        document.cookie =
            "_smart_home_api_key=SFMyNTY.g3QAAAABbQAAAAd1c2VyX2lkbQAAACQ0MDVhZjU5YS04NzcyLTRjOGEtYjFmNC01NTZmNzFiY2M4YTM.ZZ9iGg6WW6S4EzPkP5-LoyDCckUwd29oQZraDCDaK7g";
        if (localStorage.getItem("access_token") != null) {
            navigate("/");
        }
    }, []);

    let renderPage = () => {
        switch (selectedPage) {
            case LoginPages.Signin:
                return (
                    <Signin
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                );
            case LoginPages.Signup:
                return (
                    <Signup
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                );
        }
    };

    return <div>{renderPage()}</div>;
};

export default Login;
