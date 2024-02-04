import React, { PropsWithChildren } from "react";
import { IoAccessibility } from "react-icons/io5";
import "./CircularProgressBar.scss";

type Props = {
    minValue: number;
    maxValue: number;
    value: number;
    unit: string;
    size: number;
    trackWidth: number;
    trackColor: string;
    indicatorWidth: number;
    indicatorColor: string;
};

const CircularProgressBar = (props: PropsWithChildren<Props>) => {
    const center = props.size / 2,
        radius =
            center -
            (props.trackWidth > props.indicatorWidth
                ? props.trackWidth
                : props.indicatorWidth),
        dashArray = 2 * Math.PI * radius,
        dashOffset =
            dashArray *
            (1 -
                (props.value - props.minValue) /
                    (props.maxValue - props.minValue));

    return (
        <>
            <div
                className="svg-pi-wrapper"
                style={{ width: props.size, height: props.size }}
            >
                <svg
                    className="svg-pi"
                    style={{ width: props.size, height: props.size }}
                >
                    <circle
                        className="svg-pi-track"
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={props.trackColor}
                        strokeWidth={props.trackWidth}
                    />
                    <circle
                        className={`svg-pi-indicator`}
                        style={{ animationDuration: "1000" }}
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={props.indicatorColor}
                        strokeWidth={props.indicatorWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="svg-pi-label">
                    {/* <span className="svg-pi-label__loading">{label}</span> */}
                    <span className="svg-pi-label__progress">
                        {props.children}
                        {`${
                            props.value > props.maxValue
                                ? props.maxValue
                                : props.value
                        }${props.unit}`}
                    </span>
                </div>
            </div>
        </>
    );
};
export default CircularProgressBar;
