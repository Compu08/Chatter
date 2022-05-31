import client from "../utils/client";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";
import { NotificationFailure, NotificationSuccess } from "../components/notifications";
import { useNavigate } from "react-router";

const useDeleteUser = (userId: string) => {
    const userData = useAppSelector(getUser);
    const navigate = useNavigate();
    const deleteQuery = async () => {
        try {
            await client.delete(`/user/${userId}`, { headers: { "Authorization": `Basic ${userData.authToken}` } })
            NotificationSuccess("¡Exito! Cuenta eliminada");
            navigate("/login");
        }
        catch (e: any) {
            NotificationFailure(e.response.data.message);
        }
    }

    return deleteQuery;
};

export default useDeleteUser;