import React, { useEffect, useState } from "react";
import Hyperlink from "../Shared/Hyperlink";
import PrimaryButton from "../Shared/PrimaryButton";
import TextBox from "../Shared/TextBox";
import GlassDiv from "../Shared/GlassDiv";
import SignInIcon from "./LoginIcon";
import { MdAir } from "react-icons/md";
import { MdDeviceThermostat } from "react-icons/md";
import { BsFillSpeakerFill } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa6";
import { BiSolidCctv } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import "./Signup.scss";
import { LoginPages } from "../../Pages/Login";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Api/AuthApi";

type Props = {
    selectedPage: LoginPages;
    setSelectedPage: React.Dispatch<React.SetStateAction<LoginPages>>;
};

const Signup = (props: Props) => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [locationCode, setLocationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [refetched, setRefetched] = useState(false);
    const navigate = useNavigate();

    const { data, refetch, isLoading, isError } = useRegister(
        fullname.split(" ")[0],
        fullname.split(" ")[1],
        username,
        password,
        locationCode
    );

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
            setErrorMessage("Invalid credentials!");
        }
    }, [data, isError]);

    return (
        <div className="login-container">
            <GlassDiv className="login-wrapper">
                <div className="signup-title">
                    <button
                        className="backbutton"
                        onClick={() => props.setSelectedPage(LoginPages.Signin)}
                    >
                        {<IoIosArrowBack />}
                    </button>
                    {"Sign up"}
                    <div></div>
                </div>
                <div className="su-fullname-txb">
                    <TextBox
                        placeholder="Full name"
                        value={fullname}
                        onChanged={(e) => {
                            setFullname(e.target.value);
                        }}
                    ></TextBox>
                </div>
                <div className="su-username-txb">
                    <TextBox
                        placeholder="Username"
                        value={username}
                        onChanged={(e) => {
                            setUsername(e.target.value);
                        }}
                    ></TextBox>
                </div>
                <div className="su-password-txb">
                    <TextBox
                        placeholder="Password"
                        value={password}
                        onChanged={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></TextBox>
                </div>
                <div className="su-location-txb">
                    <TextBox
                        placeholder="Location code"
                        value={locationCode}
                        onChanged={(e) => {
                            setLocationCode(e.target.value);
                        }}
                    ></TextBox>
                </div>
                <PrimaryButton
                    button_value="Sign up"
                    className="su-primary-button"
                    onClick={() => {
                        refetch();
                        setRefetched(true);
                    }}
                ></PrimaryButton>
                <div className="error-message">{errorMessage}</div>
                <div className="login-icon purifier">
                    <SignInIcon icon={<MdAir />}></SignInIcon>
                </div>
                <div className="login-icon thermostat">
                    <SignInIcon icon={<MdDeviceThermostat />}></SignInIcon>
                </div>
                <div className="login-icon speaker">
                    <SignInIcon icon={<BsFillSpeakerFill />}></SignInIcon>
                </div>
                <div className="login-icon light">
                    <SignInIcon icon={<FaLightbulb />}></SignInIcon>
                </div>
                <div className="login-icon camera">
                    <SignInIcon icon={<BiSolidCctv />}></SignInIcon>
                </div>
            </GlassDiv>
        </div>
    );
};

export default Signup;
