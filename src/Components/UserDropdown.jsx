import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import { FcManager } from 'react-icons/fc';
import { useUserContext } from './UserContext';


function UserDropdown({ userData }) {
  const { logout } = useUserContext();
 
  const handleLogout = () => {
    logout();
  
  };

  return (
    <NavDropdown
      title={
        userData.image ? (
          <Image src={userData.image} alt={userData.name} width={50} roundedCircle />
        ) : (
          <FcManager className="fs-1" />
        )
      }
      id="basic-nav-dropdown"
      className=" rounded-circle"
    >
      <NavDropdown.Item>{userData.name}</NavDropdown.Item>
      <NavDropdown.Item>{userData.role}</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
    </NavDropdown>
  );
}

export default UserDropdown;
