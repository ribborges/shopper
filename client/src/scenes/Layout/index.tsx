import { ReactNode } from "react";

import "./style.scss";

interface layoutProps {
    children?: ReactNode
}

export default function Layout(props: layoutProps) {
    return (
        <div className="layout">
            {props.children}
        </div>
    );
}