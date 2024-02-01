import React from 'react'
import "./PrimaryButton.scss"

type Props = {
    button_value: string;
    className?: string;
    width?: string;
    height?: string;
    color?: string;
    background?: string
};

const PrimaryButton = (props: Props) => {
    return(
        <div 
            className={`primary-button ` + props.className}>
            <input style={
                {
                    width: props.width != null ? props.width : "380px",
                    height: props.height != null ? props.height : "60px",
                    color: props.color != null ? props.color : "white",
                    background: props.background
                }
            } type="button" value={props.button_value}/>
        </div>
    );
};

export default PrimaryButton;