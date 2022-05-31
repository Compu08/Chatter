import { useLocation } from "react-router";

function Footer(){

    const { pathname } = useLocation();
    const isHomeOrChat = () => { return ["/chat"].includes(pathname)}

    return (
        <footer className={isHomeOrChat() ? "" : "bg-chatter-blue w-100 text-white"}>
        <div className="px-5 text-center w-100">
            Todos los derechos reservados ® - Gastón Hernandez
        </div> 
      </footer>
    )
}

export default Footer;