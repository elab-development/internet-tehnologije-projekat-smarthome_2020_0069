import React from "react";
import "./Slider.scss";

type Props = {
    min: number;
    max: number;
    value: number;
    label: string;
    unit: string;
    onChanged: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const Slider = (props: Props) => {
    return (
        <div className="slider">
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.onChanged}
                className="slider-input"
            />
            <div className="slider-value">
                {props.label + ": " + props.value + props.unit}
            </div>
        </div>
    );
};

export default Slider;
