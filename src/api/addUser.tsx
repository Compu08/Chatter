import client from "../utils/client";
import { useNavigate } from "react-router-dom";

const useRegister = (data: FormData) => {
    const navigate = useNavigate();
    const registerQuery = async () => {
        try {
            await client.post("/user/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/login")
        }
        catch (e:any){
            console.log(e.response.data.message);
        }
    };

    return registerQuery;
};

export default useRegister;