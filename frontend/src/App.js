
// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import EventsList from './pages/EventsList';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Muestra mensaje si no hay sesión
function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <UnauthorizedPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/users-list"
            element={
              <PrivateRoute>
                <UsersList />
              </PrivateRoute>
            }
          />

          <Route
            path="/events-list"
            element={
              <PrivateRoute>
                <EventsList />
              </PrivateRoute>
            }
          />

          {/* Si no coincide, redirige a login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}