import { ChangeEventHandler } from "react";

function Field(props: { title: string, placeholder: string, type: string, name: string, onChange?: ChangeEventHandler<HTMLInputElement> }) {
    return (
        <div className="content d-flex flex-column mb-4 position-relative" data-aos="fade">
            <span>{props.title}</span>
            <div className="position-relative">
                <input type={props.type} className="form-control effect-5 position-relative" name={props.name} id={props.name} placeholder={props.placeholder} onChange={props.onChange} />
                <span className="focus-border"></span>
            </div>
        </div>
    )
}

export default Field;