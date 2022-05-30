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
        }
        catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    return deleteQuery;
}

export default useDeleteChat;