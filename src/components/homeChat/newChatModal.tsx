import { Modal } from "react-bootstrap";
import client from "../../utils/client";
import newChat from "../../api/newChat";
import {useState} from 'react';
import {ChatModalProps} from '../../utils/types';
import useAddChat from "../../api/newChat";

function NewChatModal({isOpen, setIsOpen, userData}: ChatModalProps) {

    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [newChatName, setNewChatName] = useState<any | null>();

    const data = new FormData();
    const addChat = useAddChat(userData.userId, data);

    const createChat = () => {
        data.append("name", newChatName);
        data.append("image", selectedImage);
        addChat();
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
        <Modal show={isOpen}>
        <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Chat</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <input type="text" placeholder="Ingrese Nombre y Apellido" onChange={handleNameChange} />
            <input type="file" placeholder="Subir foto de perfil" onChange={handleImageChange} />
        </Modal.Body>

        <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
            <button className="btn btn-primary" onClick={createChat}>Agregar</button>
        </Modal.Footer>
    </Modal>
    )
}

export default NewChatModal;