import React from "react";
import "./PrimaryButton.scss";

type Props = {
    button_value: string;
    className?: string;
    width?: string;
    height?: string;
    color?: string;
    background?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
};

const PrimaryButton = (props: Props) => {
    return (
        <div className={`primary-button ` + props.className}>
            <input
                style={{
                    width: props.width != null ? props.width : "380px",
                    height: props.height != null ? props.height : "70px",
                    color: props.color != null ? props.color : "white",
                    background: props.background,
                }}
                type="button"
                value={props.button_value}
                onClick={props.onClick}
            />
        </div>
    );
};

export default PrimaryButton;
