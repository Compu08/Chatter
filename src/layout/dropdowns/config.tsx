import { MouseEventHandler, useState } from "react"
import useDeleteUser from "../../api/deleteUser";
import ConfirmDialog from "../../components/confirmDialog";
import NewChatModal from "../../components/homeChat/newChatModal";
import { useAppSelector } from "../../redux/hooks";
import { getUser } from "../../redux/userSlice";
import { UserDataState } from "../../utils/types";

function ConfigDropdown(props:{getChatsData: any , userData:UserDataState, isOpen:Boolean, setIsOpen:any}){

    const [delDialogIsOpen, setDelDialogIsOpen] = useState(false);
    const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);

    const userData = useAppSelector(getUser);
    const delUser = useDeleteUser(userData.userId);

    const handleDeleteUser = () => {
        setDelDialogIsOpen(true);
    }
    
    const handleNewChatModal = () => {
        setNewChatModalIsOpen(true);
    }

    const handleConfirmDelete = () => {
        delUser();
    }

    return(
        <div className={props.isOpen ? "configDropdown scale1" : "configDropdown"}>
            <ul>
                <li onClick={handleNewChatModal}><div>Nuevo chat</div></li>
                <li onClick={handleDeleteUser}><div>Eliminar cuenta</div></li>
            </ul>

            <NewChatModal isOpen={newChatModalIsOpen} setIsOpen={setNewChatModalIsOpen} userData={props.userData} getChatsData={props.getChatsData}/>
            <ConfirmDialog title="Eliminar Usuario" text="¿Está seguro que desea eliminar la cuenta?" isOpen={delDialogIsOpen} handleNo={setDelDialogIsOpen} handleYes={handleConfirmDelete} />
        </div>
    )
}

export default ConfigDropdown