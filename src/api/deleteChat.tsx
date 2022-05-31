import { NotificationFailure, NotificationSuccess } from "../components/notifications";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";
import client from "../utils/client";

const useDeleteChat = (userId: string, chatId: string) => {
    const userData = useAppSelector(getUser);
    const deleteQuery = async () => {
        try {
            await client.delete(`/chat/${userId}/${chatId}`,
                {
                    headers: {
                        "Authorization": `Basic ${userData.authToken}`
                    },
                });
            NotificationSuccess("¡Exito! Conversación eliminada");
        }
        catch (e: any) {
            NotificationFailure(e.response.data.message);
        }
    }

    return deleteQuery;
}

export default useDeleteChat;