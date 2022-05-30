import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";
import client from "../utils/client";

const useSendMsg = (msg: string, userId: string, chatId: string) => {
    const userData = useAppSelector(getUser);
    const sendMsgQuery = async () => {
        try {
            await client.post(`/chat/${userId}/${chatId}`, { message: msg }, {
                headers: {
                    "Authorization": `Basic ${userData.authToken}`
                }
            }).then( (response) => console.log(response));
        }
        catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    return sendMsgQuery;
}

export default useSendMsg;