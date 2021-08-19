import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { getMovies } from '../redux/actions/movies';
import { getSeries } from '../redux/actions/series';
import { Search } from './Search';

const Header = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const [totalResults, setTotalResults] = useState('');

    useEffect(() => {
        dispatch(getMovies());
        dispatch(getSeries());
    }, [dispatch]);

    const goToMovies = () => {
        history.push('/');
    }

    const goToSeries = () => {
        history.push('/series');
    }

    const goToFavorites = () => {
        history.push('/favorites');
    }

    return (
        <>
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
            <Search />
        </>
    )
}

export default Header;