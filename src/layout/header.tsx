import logo from '../assets/images/logo_chatter_color_2.png';
import { NavLink, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUser, setLogoutData } from '../redux/userSlice';
import { NotificationSuccess } from '../components/notifications';

function Header() {

  const { pathname } = useLocation();
  const active = () => { return ["/login", "/"].includes(pathname) };

  const userData = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const signOff = () => {
    dispatch(setLogoutData());
    NotificationSuccess("Se ha cerrado la sesión");
  }

  return (
    <Navbar expand="lg" className="mx-4 header header-height w-100" variant="dark">
      <Container className="mw-100 w-100 d-flex justify-content-between m-0">
        <Navbar.Brand className="brand-logo"><img src={logo} className="mh-100 mw-100 d-block" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">

          {userData.authToken ?
            <Nav className="d-flex gap-3">
              <NavLink to="/login" className="nav-item" onClick={signOff}>Abandonar Sesión</NavLink>
            </Nav>
            :
            <Nav className="d-flex gap-3">
              <NavLink to="/" className={() => "nav-item"}>Información de la Empresa</NavLink>
              <NavLink to="/register" className="nav-item">Registrarse</NavLink>
              <NavLink to="/login" className={() => active() ? "nav-item active" : "nav-item"}>Iniciar Sesión</NavLink>
            </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>


  )
}

export default Header;