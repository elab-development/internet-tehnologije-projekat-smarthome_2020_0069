import React from 'react'
import GlassDiv from '../Shared/GlassDiv';
import Profile from './Profile';
import Statistics from './Statistics';
import "./Settings.scss"
import { useState } from 'react';

type Props = {

};

const Settings = (props: Props) => {


    return(
        <GlassDiv className='settings-wrapper'>
            <Profile></Profile>
            <Statistics></Statistics>
        </GlassDiv>
    );

};

export default Settings;