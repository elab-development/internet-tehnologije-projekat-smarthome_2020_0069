import React from 'react'
import "./TextBox.scss"

type Props = {
    placeholder: string;
};

const TextBox = (props: Props) => {

    return (
        <div className="textbox-container">
            <input 
                type="text"
                placeholder={props.placeholder}
             />
        </div>
    );

}

export default TextBox;