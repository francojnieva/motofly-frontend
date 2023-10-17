import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import Form from 'react-bootstrap/Form';
import Logo from '../assets/images/logo2.png';
import { Image } from 'react-bootstrap';
import { FaSistrix } from 'react-icons/fa';
import { IconCart } from './IconCart';
import { SearchBar } from './SearchBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserDropdown from './UserDropdown';

function NavBar() {
  const { userData } = useUserContext();

  return (
    <Navbar expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Image src={Logo} width={90} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <div className="w-100 d-lg-flex align-items-center flex-lg-row-reverse">
          
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-lg-flex justify-content-lg-end search-icon-container"
          >  <div className="container-search p-2">
          <Form className="d-flex bg-light rounded-pill">
            <SearchBar />
            <FaSistrix className="icon-search fs-1 pe-3 pt-2" />
          </Form>
        </div>
            <div>
              <Nav className="me-auto">
                <IconCart />
                {userData ? (
                  <UserDropdown userData={userData} />
                ) : (
                  <>
                    <Link to="/login" className="btn-login">
                      <button className="m-3 btn text-white">
                        Iniciar sesión
                      </button>
                    </Link>
                    <Link to="/register" className="btn-login">
                      <button className="m-3 btn text-white">Registrarme</button>
                    </Link>
                  </>
                )}
              </Nav>
            </div>
          
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
