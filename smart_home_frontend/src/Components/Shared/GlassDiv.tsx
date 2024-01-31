import React from "react";
import { PropsWithChildren } from "react";
import "./GlassDiv.scss";

type Props = {
    className?: string;
    roundTop?: number;
    roundBottom?: number;
};

const GlassDiv = (props: PropsWithChildren<Props>) => {
    return (
        <div
            className={"glass-div " + props.className}
            style={{
                borderTopLeftRadius:
                    props.roundTop != null ? `${props.roundTop}px` : "30px",
                borderTopRightRadius:
                    props.roundTop != null ? `${props.roundTop}px` : "30px",
                borderBottomLeftRadius:
                    props.roundBottom != null
                        ? `${props.roundBottom}px`
                        : "30px",
                borderBottomRightRadius:
                    props.roundBottom != null
                        ? `${props.roundBottom}px`
                        : "30px",
            }}
        >
            {props.children}
        </div>
    );
};

export default GlassDiv;
