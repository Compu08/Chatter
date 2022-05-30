import client from "../utils/client";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";

const useDeleteUser = (userId: string) => {
    const userData = useAppSelector(getUser);
    const deleteQuery = async () => {
        try {
            await client.delete(`/user/${userId}`, { headers: { "Authorization": `Basic ${userData.authToken}` } })
        }
        catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    return deleteQuery;
};

export default useDeleteUser;