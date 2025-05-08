// src/components/NavBar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function NavBar() {
    const { token, logout } = useAuth();
    const location = useLocation();

    // Oculta las opciones protegidas cuando estés en login o register
    const hideProtected = ['/login', '/register'].includes(location.pathname);

    const navVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } }
    };

    return (
        <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
        >
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to={token ? "/dashboard" : "/login"} className="fw-bold" style={{ fontFamily: 'Pacifico, cursive' }}>
                        BuenaVibra
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-nav" />
                    <Navbar.Collapse id="main-nav">
                        <Nav className="me-auto">
                            {!hideProtected && token && (
                                <>
                                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link as={Link} to="/users-list">Users</Nav.Link>
                                    <Nav.Link as={Link} to="/events-list">Events</Nav.Link>
                                </>
                            )}
                        </Nav>
                        <Nav>
                            {!hideProtected && token ? (
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            ) : hideProtected || !token ? (
                                <>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </>
                            ) : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </motion.div>
    );
}