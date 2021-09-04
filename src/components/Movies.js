import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { GET_MOVIES } from '../fetch/urls';
import { getAllMovies } from '../helpers/fetchData';
import { searchItems } from '../helpers/search';
import { Labels } from './Labels';
import MoviesList from './MoviesList';
import Pagination from './Pagination';
import { SearchList } from './SearchList';

const Movies = () => {

    const [movies, setMovies] = useState([]);

    const [filtered] = useState([]);

    const [genders, setGenders] = useState([]);

    const [years, setYears] = useState([]);

    const [totalResults, setTotalResults] = useState('');

    const [totalMovieResults, setTotalMovieResults] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const [moviesPerPage] = useState(20);

    const [results, setResults] = useState([]);

    const { data: moviesList } = useSelector(state => state.movies);

    const { moviesGenres: gendersList } = useSelector(state => state.genders);

    const { moviesYears } = useSelector(state => state.years);

    useEffect(() => {
        setMovies(moviesList);
        setGenders(gendersList);
        setYears(moviesYears);
        settingTotalMovieResults();
    }, [moviesList, gendersList, moviesYears]);

    const filterByGender = async (e) => {
        const selectedGender = e.target.value;
        const allMovies = await getAllMovies();
        filtered.length = 0;

        if (selectedGender === 'Seleccione...') {
            setMovies(moviesList);
            setTotalMovieResults(moviesList.length);
        } else {
            for (const movie of allMovies) {
                const genders = movie.genre_ids;
                for (const gender of genders) {
                    if (Number(selectedGender) === gender) {
                        filtered.push(movie);
                    }
                }
            }
            setMovies(filtered);
            setTotalMovieResults(filtered.length);
        }
    }

    const filterByYear = async (e) => {
        const selectedYear = e.target.value;
        const allMovies = await getAllMovies();
        filtered.length = 0;

        if (selectedYear === 'Seleccione...') {
            setMovies(moviesList);
            setTotalMovieResults(moviesList.length);
        } else {
            for (const movie of allMovies) {
                if (movie.release_date) {
                    const releaseYear = movie.release_date.substring(0, 4);
                    if (selectedYear === releaseYear) {
                        filtered.push(movie);
                    }
                }
            }
            setMovies(filtered);
            setTotalMovieResults(filtered.length);
        }
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

    const settingTotalMovieResults = async () => {
        const next = await axios.get(GET_MOVIES);
        const data = await next.data.total_pages;
        setTotalMovieResults(data);
    }

    const nextPage = async (pageNumber) => {
        const next = await axios.get(GET_MOVIES + `&page=${pageNumber}`);
        const data = await next.data.results;
        setMovies(data);
        setCurrentPage(pageNumber);
    }

    const numberPages = Math.floor(totalMovieResults / moviesPerPage);
    const last = currentPage * moviesPerPage;
    const first = last - moviesPerPage;
    const currentMovies = (filtered.length !== 0) ? filtered.slice(first, last) : movies;

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
                        {(filtered.length !== 0)
                            ?
                            <MoviesList movies={currentMovies} />
                            :
                            <MoviesList movies={movies} />
                        }
                        <div style={{ clear: 'both' }}></div>
                        {(totalMovieResults >= moviesPerPage) &&
                            <Pagination
                                pages={numberPages}
                                nextPage={nextPage}
                                currentPage={currentPage}
                            />
                        }
                    </>
            }

        </>
    )
}

export default Movies;