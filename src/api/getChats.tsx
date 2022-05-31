import { useDispatch } from "react-redux";
import { NotificationFailure } from "../components/notifications";
import { getChats, setChatsData } from "../redux/chatsSlice";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";
import client from "../utils/client";

const useGetChats = (userId: string) => {
    const userData = useAppSelector(getUser);
    const dispatch = useDispatch();
    const getChatsQuery = async () => {
        try {
            const {data:chatsQuery} = await client.get(`/chat/${userId}` ,
                {
                    headers: {
                        "Authorization": `Basic ${userData.authToken}`
                    }
                });
            await dispatch(setChatsData(chatsQuery.chats));
        }
        catch (e: any) {
            NotificationFailure(e.response.data.message);
            
        }
    }
    
    return getChatsQuery;
}

export default useGetChats;