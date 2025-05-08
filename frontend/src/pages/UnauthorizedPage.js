import React from 'react';
import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
    return (
        <div className="container mt-5">
            <h3>Debes iniciar sesión para acceder a esta página.</h3>
            <p>
                Por favor, <Link to="/login">inicia sesión</Link> para continuar.
            </p>
        </div>
    );
}
