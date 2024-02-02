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
