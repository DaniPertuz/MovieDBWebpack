import React, { useEffect, useState } from 'react';
import { genresList } from '../helpers/genres';
import { getYearsAll } from '../helpers/years';
import SearchItem from './SearchItem';

export const SearchList = ({ searchedItems }) => {

    const [items, setItems] = useState([]);

    const [years, setYears] = useState([]);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        setItems(searchedItems);
        genresList().then((genres) => setGenres(genres));
        getYearsAll().then((years) => setYears(years));
    }, []);

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const item of searchedItems) {
            let genders;

            if (item.genre_ids === undefined) {
                genders = item.known_for[0].genre_ids;
            } else {
                genders = item.genre_ids;
            }

            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(item);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            filtered = data;
        }

        setItems(filtered);
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const movie of searchedItems) {
            const releaseYear = movie.release_date.substring(0, 4);
            if (selectedYear === releaseYear) {
                filtered.push(movie);
            }
        }

        if (selectedYear === 'Seleccione...') {
            filtered = data;
        }

        setMovies(filtered);
    }

    return (
        <>
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
                        {
                            years.map((year, index) => (
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
                        {genres.map(({ id, name }, index) => (
                            <option key={index} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="rowManual">
                {items && (items.length !== 0)
                    ? items.map((item, index) =>
                        <SearchItem
                            key={index}
                            {...item}
                        />
                    )
                    :
                    <h3 className="text-center">No hay películas...</h3>
                }
            </div>
        </>
    )
}
