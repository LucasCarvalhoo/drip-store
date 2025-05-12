// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
        <AppRoutes />
    </Router>
  );
}

export default App;