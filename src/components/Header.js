import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {

    const history = useHistory();

    const [location, setLocation] = useState('');

    const setActive = (pathname) => {
        setLocation(pathname);
    }

    return (
        <header className="container-fluid bg-white">
            <div className="content">
                <img id="logo" src={logo} alt="Logo" />
                <h1 id="title">Showapp</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <button
                            className={(location === '/') ? "visited" : "links"}
                            onClick={() => {
                                if (location === '/') {
                                    history.go('/');
                                }
                                history.replace('/');
                                setActive('/');
                            }}>
                            Movies
                        </button>
                    </li>
                    <li>
                        <button
                            className={(location === '/series') ? "visited" : "links"}
                            onClick={() => {
                                if (location === '/series') {
                                    history.go('/series');
                                }
                                history.replace('/series');
                                setActive('/series');
                            }}>
                            Series
                        </button>
                    </li>
                    <li>
                        <button className={(location === '/favorites') ? "visited" : "links"}
                            onClick={() => {
                                if (location === '/favorites') {
                                    history.go('/favorites');
                                }
                                history.replace('/favorites');
                                setActive('/favorites');
                            }}>
                            Favoritos
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;