import React from "react";
import { PropsWithChildren } from "react";
import "./PageButton.scss";

type Props = {
    active: boolean;
    icon: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const PageButton = (props: PropsWithChildren<Props>) => {
    return (
        <button
            className={
                "page-button" +
                (props.active ? " active-button" : " inactive-button")
            }
            onClick={props.onClick}
        >
            {props.icon}
        </button>
    );
};

export default PageButton;
