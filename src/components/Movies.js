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
import { getMovieGenreId } from '../helpers/genres';

const Movies = () => {

    const [movies, setMovies] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [yearFilter, setYearFilter] = useState('');

    const [genreSelected, setGenreSelected] = useState('');

    const [showGenreFilter, setShowGenreFilter] = useState(false);

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
        filtering(yearFilter, genreSelected);
    }, [moviesList, gendersList, moviesYears, yearFilter, genreSelected]);

    const filtering = async (selectedYear, selectedGenre) => {
        const allMovies = await getAllMovies();
        const genreID = await getMovieGenreId(selectedGenre);

        if (selectedYear === '' && selectedGenre === '') {
            setMovies(moviesList);
            setTotalMovieResults(moviesList.length);
        } else if ((selectedYear !== '' || selectedYear !== 'Seleccione...') && selectedGenre === '') {
            let yearFiltered = [];

            for (const movie of allMovies) {
                if (movie.release_date) {
                    const year = movie.release_date.substring(0, 4);
                    if (year === selectedYear) {
                        yearFiltered.push(movie);
                    }
                }
            }

            setFiltered(yearFiltered);
            setMovies(filtered);
            setTotalMovieResults(filtered.length);
        } else if ((selectedYear === '' || selectedYear === 'Seleccione...') && selectedGenre !== '') {
            let genreFiltered = [];

            for (const movie of allMovies) {
                const genres = movie.genre_ids;
                for (const genre of genres) {
                    if (genreID === genre) {
                        genreFiltered.push(movie);
                    }
                }
            }

            setFiltered(genreFiltered);
            setMovies(filtered);
            setTotalMovieResults(filtered.length);
        } else {
            let allFiltered = [];

            for (const movie of allMovies) {
                if (movie.release_date) {
                    const genres = movie.genre_ids;
                    for (const genre of genres) {
                        if ((genreID === genre) && (movie.release_date.substring(0, 4) === selectedYear)) {
                            allFiltered.push(movie);
                        }
                    }
                }
            }

            setFiltered(allFiltered);
            setMovies(filtered);
            setTotalMovieResults(filtered.length);
        }
    }

    const filterByGenre = (e) => {
        setGenreSelected(e.target.value);
    }

    const filterByYear = (e) => {
        setYearFilter(e.target.value);
    }

    const handleShowGenreFilter = () => {
        setShowGenreFilter(true);
    }

    const handleHideGenreFilter = () => {
        setShowGenreFilter(false);
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
                    placeholder="Search for a movie, series and videos"
                    onChange={getSearch}
                />
            </div>
            {
                totalResults &&
                <h3 className="results">{totalResults} coincidencias</h3>
            }
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
                                <input
                                    id="inputGenre"
                                    type="search"
                                    name="genre"
                                    className="selects"
                                    placeholder="Filtrar por..."
                                    autoComplete="off"
                                    onChange={filterByGenre}
                                    value={genreSelected}
                                    onFocus={handleShowGenreFilter}
                                />
                                {showGenreFilter &&
                                    <div id="listGenres">
                                        <ul>
                                            <li
                                                key={0}
                                                onClick={() => {
                                                    setGenreSelected('');
                                                    handleHideGenreFilter();
                                                }}>
                                                All
                                            </li>
                                            {genders.map((genre, index) => (
                                                <li
                                                    key={index}
                                                    name="genre"
                                                    onClick={() => {
                                                        setGenreSelected(genre.name);
                                                        handleHideGenreFilter();
                                                    }}
                                                >
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="items">
                            {(filtered.length !== 0)
                                ?
                                <MoviesList movies={currentMovies} />
                                :
                                <MoviesList movies={movies} />
                            }
                        </div>
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