// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar.css'; // Import custom styles

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar shadow-sm px-4">
            <NavLink to="/" className="navbar-brand fw-bold fs-4">
                🎓 Campus Access
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/" end className="nav-link">
                            🧾 Generate
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/scan" className="nav-link">
                            📷 Scan
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
