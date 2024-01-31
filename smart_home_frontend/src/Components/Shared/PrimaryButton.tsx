import React from 'react'
import "./PrimaryButton.scss"

type Props = {
    button_value: string;
    className?: string;
};

const PrimaryButton = (props: Props) => {
    return(
        <div className={`primary-button ` + props.className}>
            <input type="button" value={props.button_value}/>
        </div>
    );
};

export default PrimaryButton;