import React from 'react'
import GlassDiv from '../Shared/GlassDiv';
import "./LoginIcon.scss"

type Props = {
    icon: React.ReactNode;
};

const LoginIcon = (props: Props) => {
    return (
        <GlassDiv roundTop={20} roundBottom={20} className='login-icon'>
            <div className='icon-border'>
                {props.icon}
            </div>
        </GlassDiv>

    );
};

export default LoginIcon;