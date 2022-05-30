import useDeleteUser from "../api/deleteUser";
import deleteUser from "../api/deleteUser";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";
import { MyProfileProps } from "../utils/types";

function MyProfile({name,lastName, email, photo}:MyProfileProps) {

    return (
        <div className="myProfile d-flex flex-row gap-3 align-items-center">
            <div className="myProfilePhoto cursor-pointer" >
                <img src={`http://localhost:8080/${photo?.substring(5)}`} alt="ProfilePhoto" className="image" />
            </div>
            <div className="myProfileData">
                <div className="myProfileId fw-bold">
                    {name} {lastName}
                </div>
                <div className="myProfileEmail fs-smaller">
                    {email}
                </div>
            </div>
        </div>
    )
}

export default MyProfile;