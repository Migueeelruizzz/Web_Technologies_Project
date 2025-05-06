import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/axios-instance';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', { name, email, password, role: 'USER' });
            alert('Usuario creado. Ahora haz login.');
            navigate('/login');
        } catch (err) {
            alert('Error al registrar usuario');
            console.error('Error registrando usuario:', err);
            // Si axios obtuvo respuesta del servidor, muéstrala:
            if (err.response) {
                alert(`Error: ${err.response.status} – ${err.response.data.error || err.response.statusText}`);
            } else {
                alert(`Error: ${err.message}`);
            }
        }
    };
    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-success">Registrarse</button>
            </form>
            <p className="mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
