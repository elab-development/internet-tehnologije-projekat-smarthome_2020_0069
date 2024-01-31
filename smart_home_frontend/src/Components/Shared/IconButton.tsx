import React from "react";
import "./IconButton.scss";

type Props = {
    icon: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    background: boolean;
};

const IconButton = (props: Props) => {
    return (
        <button
            className="icon-button"
            style={{
                backgroundColor: props.background
                    ? "rgba(15,15,15,0.19)"
                    : "transparent",
            }}
        >
            {props.icon}
        </button>
    );
};

export default IconButton;
