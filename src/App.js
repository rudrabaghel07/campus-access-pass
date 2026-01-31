// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // ✅ Import your Navbar
import GenerateQR from './components/GenerateQR';
import ScanQR from './components/ScanQR';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* ✅ Use the Navbar component here */}
      <Routes>
        <Route path="/" element={<GenerateQR />} />
        <Route path="/scan" element={<ScanQR />} />
      </Routes>
    </Router>
  );
};

export default App;
