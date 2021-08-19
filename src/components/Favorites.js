import React, { useEffect, useState } from 'react';
import { genresList } from '../helpers/genres';
import { getYearsAll } from '../helpers/years';
import FavoriteItem from './FavoriteItem';

const Favorites = () => {

    const [years, setYears] = useState([]);

    const favorites = JSON.parse(localStorage.getItem('favorites'));

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getYearsAll().then((years) => setYears(years));
        genresList().then((genres) => setGenres(genres));
    }, []);

    return (
        <>
            <div className="rowManual">
                <div className="column-6">
                    <select className="selects" name="year" id="comboYear">
                        <option
                            key={0}
                            value="Select">
                            Seleccione...
                        </option>
                        {
                            years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))
                        }
                    </select>
                    <select className="selects" name="year" id="comboGenre">
                        <option
                            key={0}
                            value="Select">
                            Seleccione...
                        </option>
                        {genres.map(({ id, name }, index) => (
                            <option key={index} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <h1>Favoritos</h1>
            <div className="rowManual">
                {favorites && favorites.map((favorite, index) =>
                    <div className="container-card">
                        <FavoriteItem
                            key={index}
                            {...favorite}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default Favorites;
