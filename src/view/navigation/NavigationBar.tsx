import React from 'react';

import { signOut } from 'firebase/auth';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const NavigationBar: React.FC = () => {
  const navigator = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigator('/login');
        console.log('Signed out successfully');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div id="navigation">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          LumenSpeiSšatl
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>
              Client
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/product"
              className={`nav-link${location.pathname === '/product' ? ' active' : ''}`}
            >
              Product
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/invoices"
              className={`nav-link${location.pathname === '/invoices' ? ' active' : ''}`}
            >
              Invoices
            </Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
