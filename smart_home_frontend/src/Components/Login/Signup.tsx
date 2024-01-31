import React from 'react'
import Hyperlink from '../Shared/Hyperlink';
import PrimaryButton from '../Shared/PrimaryButton';
import TextBox from '../Shared/TextBox';
import GlassDiv from '../Shared/GlassDiv';
import SignInIcon from './LoginIcon';
import { MdAir } from "react-icons/md";
import { MdDeviceThermostat } from "react-icons/md";
import { BsFillSpeakerFill } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa6";
import { BiSolidCctv } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import "./Signup.scss"
import { LoginPages } from '../../Pages/Login';

type Props = {
    selectedPage: LoginPages;
    setSelectedPage: React.Dispatch<React.SetStateAction<LoginPages>>;
}

const Signup = (props: Props) => {
    return(
        <div className='login-container'>
            <GlassDiv className="wrapper">
                <div className="signup-title">
                    <button className='backbutton' onClick={()=>props.setSelectedPage(LoginPages.Signin)}>
                        {<IoIosArrowBack/>}
                    </button>
                    {"Sign up"}
                    <div></div>
                </div>
                <div className="su-firstname-txb"><TextBox placeholder="First name"></TextBox></div>
                <div className="su-lastname-txb"><TextBox placeholder="Last name"></TextBox></div>
                <div className="su-username-txb"><TextBox placeholder="Username"></TextBox></div>
                <div className="su-password-txb"><TextBox placeholder="Password"></TextBox></div>
                <PrimaryButton button_value="Sign up" className='su-primary-button'></PrimaryButton>
                <div className='login-icon purifier'>
                    <SignInIcon icon={<MdAir />}></SignInIcon>
                </div>
                <div className='login-icon thermostat'>
                    <SignInIcon icon={<MdDeviceThermostat />}></SignInIcon>
                </div>
                <div className='login-icon speaker'>
                    <SignInIcon icon={<BsFillSpeakerFill />}></SignInIcon>
                </div>
                <div className='login-icon light'>
                    <SignInIcon icon={<FaLightbulb />}></SignInIcon>
                </div>
                <div className='login-icon camera'>
                    <SignInIcon icon={<BiSolidCctv />}></SignInIcon>
                </div>
            </GlassDiv>
        </div>
    );
};


export default Signup;