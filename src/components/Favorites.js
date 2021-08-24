import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFavorites } from '../redux/actions/favorites';
import { getSeriesYears } from '../redux/actions/years';
import FavoriteItem from './FavoriteItem';
import { Labels } from './Labels';

const Favorites = () => {

    const dispatch = useDispatch();

    const [favorites, setFavorites] = useState([]);

    const [years, setYears] = useState([]);

    const [genders, setGenders] = useState([]);

    const { seriesYears } = useSelector(state => state.years);

    const { data: gendersList } = useSelector(state => state.genders);

    useEffect(() => {
        dispatch(getSeriesYears());
        setYears(seriesYears);
        setGenders(gendersList);
        dispatch(getFavorites(window.$favorites));
        setFavorites(window.$favorites);
    }, []);

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const item of window.$favorites) {
            const genders = item.genre_ids;
            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(item);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            filtered = window.$favorites;
        }

        setFavorites(filtered);
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const item of window.$favorites) {
            if (item.release_date) {
                const releaseYear = item.release_date.substring(0, 4);
                if (selectedYear === releaseYear) {
                    filtered.push(item);
                }
            }
        }

        if (selectedYear === 'Seleccione...') {
            filtered = window.$favorites;
        }

        setFavorites(filtered);
    }

    return (
        <>
            <Labels />
            <div className="rowManual">
                <div className="column-6">
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
                favorites.map((item, index) => (
                    <FavoriteItem
                        key={index}
                        {...item}
                    />
                ))
            }
        </>
    )
}

export default Favorites;