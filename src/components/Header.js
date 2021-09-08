import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {

    const history = useHistory();

    const [location, setLocation] = useState('');

    const setActive = (pathname) => {
        console.log(pathname);
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
                                history.push('/');
                                setActive(history.location.pathname);
                            }}>
                            Movies
                        </button>
                    </li>
                    <li>
                        <button
                            className={(location === '/series') ? "visited" : "links"}
                            onClick={() => {
                                history.push('/series');
                                setActive(history.location.pathname);
                            }}>
                            Series
                        </button>
                    </li>
                    <li>
                        <button className={(location === '/favorites') ? "visited" : "links"}
                            onClick={() => {
                                history.push('/favorites');
                                setActive(history.location.pathname);
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