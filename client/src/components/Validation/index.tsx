import "./style.scss";

interface validationProps {
    error?: boolean,
    message?: string
}

export default function Validation(props: validationProps) {
    return (
        <p className={"validation" + (" " + props.error)}>{props.message}</p>
    );
}