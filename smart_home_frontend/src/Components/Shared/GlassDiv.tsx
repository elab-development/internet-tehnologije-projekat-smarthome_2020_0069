import React from "react";
import { PropsWithChildren } from "react";

type Props = {
    className?: string;
};

const GlassDiv = (props: PropsWithChildren<Props>) => {
    return (
        <div className={"glass-div " + props.className}>{props.children}</div>
    );
};

export default GlassDiv;
