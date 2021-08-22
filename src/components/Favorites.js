import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { genresList } from '../helpers/genres';
import { getYearsAll } from '../helpers/years';
import FavoriteItem from './FavoriteItem';
import Filters from './Filters';
import Header from './Header';
import { Labels } from './Labels';
import { Search } from './Search';
import logo from '../assets/logo.jpeg';

const Favorites = ({ location }) => {

    const history = useHistory();

    const [years, setYears] = useState([]);

    const [genres, setGenres] = useState([]);

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getYearsAll().then((years) => setYears(years));
        genresList().then((genres) => setGenres(genres));
        setFavorites(location.state.state);
    }, []);

    const goBack = () => {
        history.push('/');
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
                                <button onClick={goBack}>
                                    Volver
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Search />
            <Labels />
            <Filters />
            <h1 className="text-center">Favoritos</h1>
            <div className="rowManual">
                {favorites && favorites.map((favorite, index) =>
                    <FavoriteItem
                        key={index}
                        {...favorite}
                    />
                )}
            </div>
        </>
    )
}

export default Favorites;