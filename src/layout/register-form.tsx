import Field from "../components/home/field";
import { useRef, useState } from 'react';
import useRegister from "../api/addUser";
import { NavLink } from 'react-router-dom';
import { RegisterData } from "../utils/types";

function Register() {

    const initialValues: RegisterData = {
        name: "",
        lastName: "",
        email: "",
        password: "",
    }

    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [formData, setFormData] = useState<RegisterData>(initialValues);
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    
    const data = new FormData();
    const register = useRegister(data);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            setSelectedImage(e.target.files[0]);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileClick = () => {
        if (hiddenFileInput.current != null) {
            hiddenFileInput.current.click();
        }
    };

    const handleRegister = () => {
        data.append("image", selectedImage);
        data.append("name", formData.name);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);
        data.append("password", formData.password);
        register();
    }

    return (
        <div id="register" className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-4 fs-1 fw-bold">
            <Field
                title="NOMBRE"
                type="text"
                name="name"
                placeholder="Ingresa tu nombre"
                onChange={handleInputChange}
            />

            <Field
                title="APELLIDO"
                type="text"
                name="lastName"
                placeholder="Ingresa tu apellido"
                onChange={handleInputChange}
            />

            <Field
                title="E-MAIL"
                type="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                onChange={handleInputChange}
            />

            <div className="content d-flex flex-column mb-4">
                <span>FOTO DE PERFIL</span>
                <label className="file">
                    <button className="btn btn-input-file" onClick={handleFileClick}>Seleccionar Archivo</button>
                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={handleImageChange} />
                </label>
            </div>

            <Field
                title="CONTRASEÑA"
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                onChange={handleInputChange}
            />

            <div className="content d-flex flex-column mb-3 d-flex align-items-start">
                <button className="btn btn-primary" onClick={handleRegister}>Registrarse</button>
            </div>

            <div className="content text d-flex flex-row gap-2 fs-6 fst-italic">
                <span>¿Ya tienes una cuenta?</span>
                <NavLink to="/login" className="text-chatter-blue">Inicia sesión aquí</NavLink>
            </div>

        </div>
    )
}

export default Register;

