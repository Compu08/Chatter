import { ChangeEventHandler } from "react";

function Field(props: {title:string, placeholder:string, type:string, name:string, onChange?:ChangeEventHandler<HTMLInputElement>}) {
    return (
        <div className="content d-flex flex-column mb-4">
            <span>{props.title}</span>
            <input type={props.type} className="form-control" name={props.name} id={props.name} placeholder={props.placeholder} onChange={props.onChange} />
        </div>
    )
}

export default Field;