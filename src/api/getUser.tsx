import client from "../utils/client";
import { useAppDispatch } from '../redux/hooks';
import { UserDataState } from "../utils/types";
import { setUserData } from "../redux/userSlice";
import { NotificationFailure } from "../components/notifications";

const useGetUserData = (userId: string) => {
  const dispatch = useAppDispatch();
  const getDataQuery = async () => {
    try {
      const {data:apiData} = await client.get(`/user/${userId}`);
      const userData:UserDataState = {
        name: apiData.name,
        lastName: apiData.lastName,
        email: apiData.email,
        photo: apiData.image,
        userId: apiData.userId,
      }
      await dispatch(setUserData(userData));
    }
    catch (e:any) {
      NotificationFailure(e.response.data.message);
    }
  }
  return getDataQuery;
}

export default useGetUserData;