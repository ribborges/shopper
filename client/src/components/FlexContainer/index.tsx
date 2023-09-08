import { ReactNode } from "react";

import "./style.scss";

interface flexContainerProps {
    flexDirection?: "column" | "column-reverse" | "row" | "row-reverse",
    gap?: string | number,
    className?: string,
    children?: ReactNode
}

export default function FlexContainer(props: flexContainerProps) {
    return (
        <div
            className={"flex-container" + (props.flexDirection ? " " + props.flexDirection : "") + (props.className ? " " + props.className : "")}
            style={{ gap: props.gap }}
        >
            {props.children}
        </div>
    );
}