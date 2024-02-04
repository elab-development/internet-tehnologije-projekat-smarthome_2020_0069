import React from 'react'
import "./StatisticsBarButton.scss"

type Props = {
    text: string;
    active: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
};

const StatisticsBarButton = (props: Props) => {

    return (
        <button
            className={
                "stat-button" +
                (props.active ? " active-button" : " inactive-button")
            }
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );

}

export default StatisticsBarButton;