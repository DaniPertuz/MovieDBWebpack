import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Header = () => {
    return (
        <header>
            <div id="headerTop" className="container-fluid bg-white">
                <div className="content">
                    <img id="logo" src={logo} alt="Logo" />
                    <h1 className="title">Showapp</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <button className="links">
                                    Películas
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/series" style={{ textDecoration: 'none' }}>
                                <button className="links">
                                    Series
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/favorites" style={{ textDecoration: 'none' }}>
                                <button className="links">
                                    Favoritos
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;