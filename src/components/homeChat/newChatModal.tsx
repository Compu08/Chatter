import { Modal } from "react-bootstrap";
import client from "../../utils/client";
import newChat from "../../api/newChat";
import {useState} from 'react';
import {ChatModalProps} from '../../utils/types';
import useAddChat from "../../api/newChat";

function NewChatModal({isOpen, setIsOpen, userData, getChatsData}: ChatModalProps) {

    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [newChatName, setNewChatName] = useState<any | null>();

    const data = new FormData();
    const addChat = useAddChat(userData.userId, data);

    const createChat = () => {
        data.append("name", newChatName);
        data.append("image", selectedImage);
        addChat().then( () => getChatsData()).then(() => handleClose() );
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setSelectedImage(e.target.files[0]);
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewChatName(e.target.value)
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return(
        <Modal className="text-chatter-black" show={isOpen} centered>
        <Modal.Header className="justify-content-center">
            <Modal.Title>Agregar Nuevo Chat</Modal.Title>
        </Modal.Header>

        <Modal.Body className="justify-content-center text-center">
            <input type="text" placeholder="Ingrese Nombre y Apellido" className="form-control mb-3" onChange={handleNameChange} />
            <input type="file" placeholder="Subir foto de perfil" className="form-control" onChange={handleImageChange} />
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
            <button className="btn btn-green bg-chatter-blue text-white px-4" onClick={createChat}>Agregar</button>
            <button className="btn btn-secondary px-4" onClick={handleClose}>Cerrar</button>
        </Modal.Footer>
    </Modal>
    )
}

export default NewChatModal;