// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const login = (tok) => {
        localStorage.setItem('token', tok);
        setToken(tok);
        navigate('/dashboard', { replace: true });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
