import { MouseEventHandler } from "react"
import useDeleteUser from "../../api/deleteUser";
import { useAppSelector } from "../../redux/hooks";
import { getUser } from "../../redux/userSlice";

function ConfigDropdown(props:{newChat:MouseEventHandler<HTMLLIElement>,isOpen:Boolean}){

    const userData = useAppSelector(getUser);
    const delUser = useDeleteUser(userData.userId);

    const handleDeleteUser = () => {
        delUser();
    }
    
    return(
        <div className={props.isOpen ? "configDropdown scale1" : "configDropdown"}>
            <ul>
                <li onClick={props.newChat}><div>Nuevo chat</div></li>
                <li onClick={handleDeleteUser}><div>Eliminar cuenta</div></li>
            </ul>
        </div>
    )
}

export default ConfigDropdown