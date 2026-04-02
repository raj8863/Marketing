import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* LOGIN */}
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/dashboard" />} 
      />

      {/* DASHBOARD PROTECTED */}
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/login" />} 
      />

      {/* PROFILE PROTECTED */}
      <Route 
        path="/profile" 
        element={user ? <Profile /> : <Navigate to="/login" />} 
      />

      {/* DEFAULT */}
      <Route 
        path="/" 
        element={<Navigate to={user ? "/dashboard" : "/login"} />} 
      />

      {/* 404 */}
      <Route 
        path="*" 
        element={<Navigate to="/" />} 
      />
    </Routes>
  );
};

export default App;