import React from 'react'
import TextBox from '../Shared/TextBox';
import PrimaryButton from '../Shared/PrimaryButton';
import Hyperlink from '../Shared/Hyperlink';
import "./Profile.scss"

type Props = {

};

const Profile = (props: Props) => {
    return(
        <div className='profile-wrapper'>
            <div className='profile-name'>
                Profile
            </div>
            <TextBox value='Stefan' readonly={true}/>
            <TextBox value='Jovanovic' readonly={true}/>
            <TextBox value='stefanjo' readonly={true}/>
            <PrimaryButton button_value='Update info'/>
            <div className='footer-text'>
                <div>
                    {"Update password? "}
                </div>
                <Hyperlink name='Click here' onclick={() => {}}></Hyperlink>
            </div>
        </div>
    );
};

export default Profile;