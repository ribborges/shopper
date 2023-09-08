import { ReactNode } from "react";
import "./style.scss";

interface validationProps {
    error?: boolean,
    message?: string,
    children?: ReactNode
}

export default function Validation(props: validationProps) {
    return (
        <>
            <p className={"validation" + (" " + props.error)}>{props.message}</p>
            <div className="data">
                {props.children}
            </div>
        </>
    );
}