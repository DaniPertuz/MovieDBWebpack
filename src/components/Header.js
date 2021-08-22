import React from 'react';
import logo from '../assets/logo.jpeg';

const Header = ({ goToMovies, goToSeries, goToFavorites }) => {
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
                            <button
                                onClick={goToMovies}
                            >
                                Películas
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={goToSeries}
                            >
                                Series
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={goToFavorites}
                            >
                                Favoritos
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;