import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../helpers/search';
import { getMoviesYears } from '../redux/actions/years';
import { Labels } from './Labels';
import MovieItem from './MovieItem';
import { SearchList } from './SearchList';

const Movies = () => {

    const dispatch = useDispatch();

    const [movies, setMovies] = useState([]);

    const [genders, setGenders] = useState([]);

    const [years, setYears] = useState([]);

    const [totalResults, setTotalResults] = useState('');

    const [results, setResults] = useState([]);

    const { data: moviesList } = useSelector(state => state.movies);

    const { data: gendersList } = useSelector(state => state.genders);

    const { moviesYears } = useSelector(state => state.years);

    useEffect(() => {
        dispatch(getMoviesYears());
        setMovies(moviesList);
        setGenders(gendersList);
        setYears(moviesYears);
    }, [moviesList, gendersList, moviesYears]);

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const movie of moviesList) {
            const genders = movie.genre_ids;
            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(movie);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            filtered = moviesList;
        }

        setMovies(filtered);
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const movie of moviesList) {
            if (movie.release_date) {
                const releaseYear = movie.release_date.substring(0, 4);
                if (selectedYear === releaseYear) {
                    filtered.push(movie);
                }
            }
        }

        if (selectedYear === 'Seleccione...') {
            filtered = moviesList;
        }

        setMovies(filtered);
    }

    const getSearch = async (e) => {
        const values = e.target.value;

        if (values !== '') {
            const resp = await searchItems(values);
            setTotalResults(resp.total_results);
            setResults(resp.results);
        } else {
            setTotalResults('');
            setResults([]);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <input
                    type="text"
                    placeholder="Buscar película, serie o video"
                    onChange={getSearch}
                />
            </div>
            {((totalResults > 0) && (totalResults !== ''))
                ?
                <SearchList results={results} />
                :
                (totalResults === 0)
                    ?
                    <h3 className="text-center">No hay items...</h3>
                    :
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
                        {movies.map((item, index) => (
                            <MovieItem
                                key={index}
                                {...item}
                            />
                        ))}
                    </>
            }

        </>
    )
}

export default Movies;