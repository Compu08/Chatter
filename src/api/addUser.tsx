import client from "../utils/client";
import { useNavigate } from "react-router-dom";
import { NotificationFailure, NotificationSuccess } from "../components/notifications";

const useRegister = (data: FormData) => {
    const navigate = useNavigate();
    const registerQuery = async () => {
        try {
            await client.post("/user/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            NotificationSuccess("¡Exito! Nueva cuenta registrada")
            navigate("/login")
        }
        catch (e:any){
            NotificationFailure(e.response.data.message);
        }
    };

    return registerQuery;
};

export default useRegister;