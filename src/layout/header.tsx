import logo from '../assets/images/logo_chatter_color_2.png';
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar expand="lg" className="mx-4 header header-height w-100">
      <Container className="mw-100 w-100 d-flex justify-content-between m-0">
        <Navbar.Brand className="brand-logo"><img src={logo} className="mh-100 mw-100 d-block" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="d-flex gap-3">
            <NavLink to="/#" className="nav-item">Información de la Empresa</NavLink>
            <NavLink to="/register" className="nav-item">Registrarse</NavLink>
            <NavLink to="/login" className="nav-item">Iniciar Sesión</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  )
}

export default Header;