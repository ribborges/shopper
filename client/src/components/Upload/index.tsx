import { useRef, useState } from "react";
import { CloudArrowUpFill, FileEarmarkFill } from "react-bootstrap-icons";

import "./style.scss";

interface uploadProps {
    onFileChange: Function,
    accept?: string
}

export default function Upload(props: uploadProps) {
    const [file, setFile] = useState<File>();
    const uploadRef = useRef<any>(null);

    const onDragEnter = () => {
        uploadRef.current.classList.add("dragover");
        console.log("AAAAAAAAAAAAAAAAAAAAAA");
    }

    const onDragLeave = () => {
        uploadRef.current.classList.remove("dragover");
        console.log("BBBBBBBBBBBBBBBBBBBBBB");
    }

    const onDrop = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            setFile(event.target.files[0]);
            props.onFileChange(event.target.files[0]);
        } else {
            console.log("Null file");
        }
    }

    return (
        <div className="file-upload">
            <div ref={uploadRef} className="file-upload-label" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDragLeave}>
                {
                    file == null ?
                        <>
                            <CloudArrowUpFill />
                            <p>Arraste e solte o arquivo .csv ou clique para fazer o upload</p>
                        </> :
                        <>
                            <FileEarmarkFill />
                            <p>{file.name}</p>
                        </>
                }
            </div>
            <input type="file" onChange={onDrop} accept={props.accept}/>
        </div>
    );
}