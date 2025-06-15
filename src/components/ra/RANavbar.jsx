import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { raRoutes } from './raConfig'; // Adjust as needed

const RANavbar = ({ currentPath = '' }) => {
  if (!currentPath.startsWith('/ra')) {
    return null;
  }

  const currentRoute = raRoutes.find(route => route.path === currentPath);
  const currentLabel = currentRoute ? currentRoute.label : 'Select Document';

  const handleNavigation = (path) => {
    window.location.hash = path;
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand>RA Documents</Navbar.Brand>
        <Navbar.Toggle aria-controls="ra-navbar-nav" />
        <Navbar.Collapse id="ra-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={currentLabel} id="ra-nav-dropdown">
              {raRoutes.map((route) => (
                <NavDropdown.Item
                  key={route.path}
                  onClick={() => handleNavigation(route.path)}
                  active={currentPath === route.path}
                >
                  {route.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RANavbar;
