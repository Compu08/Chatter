import Field from "../components/home/field";
import React, { useState } from 'react';
import useLogIn from "../api/login";
import { LoginData } from "../utils/types";
import {NavLink} from 'react-router-dom';

function LoginForm() {

    const initialValues:LoginData = {
        email: "",
        password: "",
    }
    
    const [formData , setFormData] = useState<LoginData>(initialValues);
    const data = new FormData();
    const login = useLogIn(data);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleLogin = () => {
        resetForm();
        data.append("email", formData.email);
        data.append("password", formData.password);
        login();
    }

    const resetForm = () => {
        data.delete("email");
        data.delete("password");
    }

    return (
        <div id="login" className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-5 fs-1 fw-bold">
            <Field
                title="E-MAIL"
                type="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                onChange={handleInputChange}
            />

            <Field
                title="CONTRASEÑA"
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                onChange={handleInputChange}
            />

            <div className="content d-flex flex-column mb-5 d-flex align-items-start">
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
            </div>

            <div className="content text d-flex flex-row gap-2 mb-5 fs-6 fst-italic">
                <span>No tienes una cuenta?</span>
                <NavLink to="/register" className="text-chatter-blue">Registrate aquí</NavLink>
            </div>
        </div>
    )
}

export default LoginForm;

