import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingGenresList } from '../helpers/genres';

import FavoritesList from './FavoritesList';
import { Labels } from './Labels';

const Favorites = () => {

    const dispatch = useDispatch();

    const [favorites, setFavorites] = useState([]);

    const [years, setYears] = useState([]);

    const [genders, setGenders] = useState([]);

    const { allYears } = useSelector(state => state.years);

    const { allGenres: gendersList } = useSelector(state => state.genders);

    const localFavorites = JSON.parse(localStorage.getItem('favorites'));

    useEffect(() => {
        if (localFavorites === null) {
            setFavorites([]);
        } else {
            setFavorites(localFavorites);
        }
    }, []);

    useEffect(() => {
        setYears(allYears);
        settingGenres();
    }, [dispatch, gendersList]);

    const settingGenres = async () => {
        const genres = await settingGenresList(gendersList);
        setGenders(genres);
    }

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const item of favoritesStorage) {
            const genders = item.genre_ids;
            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(item);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            filtered = favoritesStorage;
        }

        setFavorites(filtered);
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const item of favoritesStorage) {
            if (item.release_date) {
                const releaseYear = item.release_date.substring(0, 4);
                if (selectedYear === releaseYear) {
                    filtered.push(item);
                }
            } else {
                const releaseYear = item.first_air_date.substring(0, 4);
                if (selectedYear === releaseYear) {
                    filtered.push(item);
                }
            }
        }

        if (selectedYear === 'Seleccione...') {
            filtered = favoritesStorage;
        }

        setFavorites(filtered);
    }

    return (
        <>
            <Labels />
            <div className="rowManual">
                <div className="column-2">
                    <select
                        id="comboYear"
                        name="year"
                        className="selects"
                        onChange={filterByYear}
                    >
                        <option
                            defaultValue>
                            Seleccione...
                        </option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))
                        }
                    </select>
                </div>
                <div className="column-2">
                    <select
                        id="comboGenre"
                        name="gender"
                        className="selects"
                        onChange={filterByGender}
                    >
                        <option
                            defaultValue>
                            Seleccione...
                        </option>
                        {genders.map(({ id, name }, index) => (
                            <option key={index} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {(favorites.length === 0)
                ?
                <h3 className="text-center">No hay items marcado como favoritos todavía</h3>
                :
                <div className="items">
                    <FavoritesList favorites={favorites} />
                </div>
            }
        </>
    )
}

export default Favorites;