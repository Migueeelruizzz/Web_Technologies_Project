// src/pages/Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <h1>Bienvenido al Dashboard</h1>
            <p>Esta es una ruta protegida.</p>
            <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
}
