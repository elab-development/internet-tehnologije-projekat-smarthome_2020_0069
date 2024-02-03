import React, { useEffect, useState } from "react";
import GlassDiv from "../Shared/GlassDiv";
import TextBox from "../Shared/TextBox";
import Button from "../Shared/PrimaryButton";
import Hyperlink from "../Shared/Hyperlink";
import LoginIcon from "../Login/LoginIcon";
import { MdAir } from "react-icons/md";
import { MdDeviceThermostat } from "react-icons/md";
import { BsFillSpeakerFill } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa6";
import { BiSolidCctv } from "react-icons/bi";
import "./Signin.scss";
import { LoginPages } from "../../Pages/Login";
import { useLogin } from "../../Api/Auth/AuthApi";
import { useNavigate } from "react-router-dom";

type Props = {
    selectedPage: LoginPages;
    setSelectedPage: React.Dispatch<React.SetStateAction<LoginPages>>;
};


const Signin = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [refetched, setRefetched] = useState(false);
    const navigate = useNavigate();

    const { data, refetch, isLoading, isError } = useLogin(username, password);

    useEffect(() => {
        if (!isLoading && !isError) {
            if (data != undefined && refetched) {
                localStorage.setItem("access_token", data.token);
                localStorage.setItem("location_id", data.location_id);
                localStorage.setItem("user_id", data.id);
                setErrorMessage("");
                setRefetched(false);
                navigate("/");
            }
        } else if (isError) {
            setErrorMessage("Wrong username or password!");
        }
    }, [data, isError]);

    return (
        <div className="login-container">
            <GlassDiv className="login-wrapper">
                <div className="signin-title">{"Sign in"}</div>

                <div className="si-username-txb">
                    <TextBox
                        placeholder="Username"
                        value={username}
                        onChanged={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="si-password-txb">
                    <TextBox
                        placeholder="Password"
                        value={password}
                        onChanged={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    button_value="Sign in"
                    className="si-primary-button"
                    onClick={() => {
                        refetch();
                        setRefetched(true);
                    }}
                ></Button>
                <div className="error-message-login">{errorMessage}</div>

                <div className="footer-text">
                    <div className="text">{"Don't have an account?"}</div>
                    <Hyperlink
                        link="#"
                        onclick={() => props.setSelectedPage(LoginPages.Signup)}
                        name="Sign up"
                    ></Hyperlink>
                </div>

                <div className="login-icon purifier">
                    <LoginIcon icon={<MdAir />}></LoginIcon>
                </div>

                <div className="login-icon thermostat">
                    <LoginIcon icon={<MdDeviceThermostat />}></LoginIcon>
                </div>

                <div className="login-icon speaker">
                    <LoginIcon icon={<BsFillSpeakerFill />}></LoginIcon>
                </div>

                <div className="login-icon light">
                    <LoginIcon icon={<FaLightbulb />}></LoginIcon>
                </div>

                <div className="login-icon camera">
                    <LoginIcon icon={<BiSolidCctv />}></LoginIcon>
                </div>
            </GlassDiv>
        </div>
    );
};

export default Signin;
