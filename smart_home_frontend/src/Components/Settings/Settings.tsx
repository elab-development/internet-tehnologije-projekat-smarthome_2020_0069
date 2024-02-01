import React from 'react'
import GlassDiv from '../Shared/GlassDiv';
import Profile from './Profile';
import Statistics from './Statistics';
import ExitModal from '../Shared/Modals/ExitModal';
import "./Settings.scss"

type Props = {

};

const Settings = (props: Props) => {

    return(
        <GlassDiv className='settings-wrapper'>
            <Profile></Profile>
            <Statistics></Statistics>
            <ExitModal></ExitModal>
        </GlassDiv>
    );

};

export default Settings;