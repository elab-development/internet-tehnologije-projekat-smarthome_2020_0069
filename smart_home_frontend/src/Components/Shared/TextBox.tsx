import React from 'react'
import "./TextBox.scss"

type Props = {
    placeholder?: string;
    value?: string;
    readonly?: boolean;
};

const TextBox = (props: Props) => {

    return (
        <div className="textbox-container">
            <input 
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                readOnly={props.readonly}
             />
        </div>
    );

}

export default TextBox;