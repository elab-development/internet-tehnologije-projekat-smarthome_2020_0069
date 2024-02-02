import React from "react";
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

type Props = {
    selectedPage: LoginPages;
    setSelectedPage: React.Dispatch<React.SetStateAction<LoginPages>>;
};

const Signin = (props: Props) => {
    return (
        <div className="login-container">
            <GlassDiv className="wrapper">
                <div className="signin-title">{"Sign in"}</div>

                <div className="si-username-txb">
                    <TextBox placeholder="Username" />
                </div>

                <div className="si-password-txb">
                    <TextBox placeholder="Password" />
                </div>

                <Button
                    button_value="Sign in"
                    className="si-primary-button"
                ></Button>

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
