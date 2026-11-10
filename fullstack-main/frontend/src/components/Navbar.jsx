import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const [expanded, setExpanded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNavbar = () => setExpanded(!expanded);
    const closeNavbar = () => {
        setExpanded(false);
        setDropdownOpen(false);
    };
    const toggleDropdown = (e) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/" onClick={closeNavbar}>
                    <h2>🚀 Fullstack CRUD</h2>
                </NavLink>
            </div>
            
            <button className="navbar-toggler" onClick={toggleNavbar}>
                {expanded ? '✖' : '☰'}
            </button>

            <ul className={`navbar-links ${expanded ? 'active' : ''}`}>
                <li><NavLink to="/tanuloi-utmutato" onClick={closeNavbar}>Tanulói Útmutató</NavLink></li>
                <li><NavLink to="/mvc-magyarazat" onClick={closeNavbar}>MVC Magyarázat</NavLink></li>
                <li><NavLink to="/fogalmak-crud" onClick={closeNavbar}>CRUD & Fullstack</NavLink></li>
                <li><NavLink to="/teszteles-altalanos" onClick={closeNavbar}>Tesztelés</NavLink></li>
                <li><NavLink to="/hasznalt-modulok" onClick={closeNavbar}>Használt Modulok</NavLink></li>
                <li><a href="/infografika/index.html" target="_blank" rel="noopener noreferrer" onClick={closeNavbar}>Infografikák 📊</a></li>
        
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
                        Komponens doksik {dropdownOpen ? '▲' : '▼'}
                    </a>
                    {dropdownOpen && (
                        <ul className="dropdown-menu">
                            <li><NavLink to="/docs-app" onClick={closeNavbar}>App</NavLink></li>
                            <li><NavLink to="/docs-userform" onClick={closeNavbar}>UserForm</NavLink></li>
                            <li><NavLink to="/docs-usertable" onClick={closeNavbar}>UserTable</NavLink></li>
                            <li><NavLink to="/docs-usertablerow" onClick={closeNavbar}>UserTableRow</NavLink></li>
                            
                        </ul>
                    )}
                </li>
                
            </ul>
        </nav>
    );
};

export default Navbar;