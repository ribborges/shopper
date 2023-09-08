import { ReactNode } from "react";

import "./style.scss";

interface buttonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    children?: ReactNode
}

export default function Button(props: buttonProps) {
    return (
        <button className="btn" onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
}