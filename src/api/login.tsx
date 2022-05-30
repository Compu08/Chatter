import client from "../utils/client";
import { UserDataState } from "../utils/types";
import { useAppDispatch } from '../redux/hooks';
import { setLoginData } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";

const useLogIn = (data: FormData) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginQuery = async () => {
    try {
      const { data: apiData } = await client.post("/user/login", data)
      const userData: UserDataState = {
        authToken: apiData.token,
        userId: apiData.userId,
      };
      await dispatch(setLoginData(userData));
      navigate("/chat");
    }
    catch (e:any) {
      console.log(e.response.data.message);
    }
  };

  return loginQuery;
};

export default useLogIn;