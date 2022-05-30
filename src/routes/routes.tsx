import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../layout/header';
import HomeChat from "../views/home-chat";
import HomeLogin from "../views/home-login";
import HomeRegister from "../views/home-register";


function AppRoutes() {

    return (
            <Routes>
                <Route index element={<HomeLogin />} />
                <Route path="/login" element={<HomeLogin />} />
                <Route path="/register" element={<HomeRegister />} />
                <Route path="/chat" element={<HomeChat />} />
            </Routes>
    )

}

export default AppRoutes;