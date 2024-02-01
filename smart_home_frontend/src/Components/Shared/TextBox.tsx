import React from "react";
import "./TextBox.scss";

type Props = {
    placeholder?: string;
    value?: string;
    readonly?: boolean;
    onChanged?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const TextBox = (props: Props) => {
    return (
        <div className="textbox-container">
            <input
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                readOnly={props.readonly}
                onChange={props.onChanged}
            />
        </div>
    );
};

export default TextBox;
