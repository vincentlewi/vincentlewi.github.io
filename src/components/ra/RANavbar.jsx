import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { raRoutes } from './raConfig'; // Adjust as needed

const RANavbar = () => {
  const [currentPath, setCurrentPath] = useState('');

  // Get the current path from the hash and update on hash change
  useEffect(() => {
    const getHashPath = () => {
      const hash = window.location.hash; // e.g. "#/ra/updates_25_03_17"
      const path = hash.startsWith('#') ? hash.slice(1) : hash;
      setCurrentPath(path);
    };

    getHashPath(); // on mount
    window.addEventListener('hashchange', getHashPath); // listen to hash changes

    return () => {
      window.removeEventListener('hashchange', getHashPath); // cleanup
    };
  }, []);

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
