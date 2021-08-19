import React, { useEffect, useState } from 'react';
import { genresList } from '../helpers/genres';
import { getAllMovies } from '../helpers/fetchData';
import { getYearsMovies } from '../helpers/years';
import { Labels } from './Labels';
import MovieItem from './MovieItem';

const Movies = () => {

    const [movies, setMovies] = useState([]);

    const [years, setYears] = useState([]);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getAllMovies().then((movies) => setMovies(movies));
        genresList().then((genres) => setGenres(genres));
        getYearsMovies().then((years) => setYears(years));
    }, []);

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const movie of data) {
            const genders = movie.genre_ids;
            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(movie);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            filtered = data;
        }

        setMovies(filtered);
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const movie of data) {
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
                {movies && (movies.length !== 0)
                    ? movies.map((movie, index) =>
                        <MovieItem
                            key={index}
                            {...movie}
                        />
                    )
                    :
                    <h3 className="text-center">No hay películas...</h3>
                }
            </div>
        </>
    )
}

export default Movies;