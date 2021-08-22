import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../helpers/fetchData';
import { genresList } from '../helpers/genres';
import { getYearsSeries } from '../helpers/years';

const Filters = ({ filterByGender, filterByYear }) => {

    const [moviesList, setMoviesList] = useState([]);

    const [years, setYears] = useState([]);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getAllMovies().then((movies) => {
            setMovies(movies);
        });

        getYearsSeries()
            .then(years => setYears(years));

        genresList()
            .then(genres => setGenres(genres));
    }, [])

    return (
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
    )
}

export default Filters;