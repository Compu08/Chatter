import { NotificationFailure, NotificationSuccess } from "../components/notifications";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";
import client from "../utils/client";

const useAddChat = (user: string, data: FormData) => {
    const userData = useAppSelector(getUser);
    const addChatQuery = async () => {
        try {
            await client.post("/chat/" + user, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Basic ${userData.authToken}`
                },
            })
            
            NotificationSuccess("¡Exito! Nueva conversación creada");
        }
        catch (e: any) {
            NotificationFailure(e.response.data.message);
        }
    }

    return addChatQuery;
}

export default useAddChat;