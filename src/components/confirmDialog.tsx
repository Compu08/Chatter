import { Modal } from "react-bootstrap";
import { ConfirmDialogProps } from "../utils/types";

function ConfirmDialog ({title,text,isOpen, handleNo, handleYes}:ConfirmDialogProps) {
   
    const closeDialog = () => {
        handleNo(false);
    }

    return (
        <Modal className="text-chatter-black" show={isOpen} centered>
        <Modal.Header className="justify-content-center" >
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
            {text}
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
            <button className="btn btn-danger px-5" onClick={handleYes}>Si</button>
            <button className="btn btn-secondary px-5" onClick={closeDialog}>No</button>
        </Modal.Footer>
    </Modal>
    )
}

export default ConfirmDialog;