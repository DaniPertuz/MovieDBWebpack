import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieGenreId, getSerieGenreId, settingGenresList } from '../helpers/genres';

import FavoritesList from './FavoritesList';
import { Labels } from './Labels';

const Favorites = () => {

    const genreRef = useRef();

    const dispatch = useDispatch();

    const [favorites, setFavorites] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [years, setYears] = useState([]);

    const [genders, setGenders] = useState([]);

    const [yearFilter, setYearFilter] = useState('');

    const [genreSelected, setGenreSelected] = useState('');

    const [showGenreFilter, setShowGenreFilter] = useState(false);

    const { allYears } = useSelector(state => state.years);

    const { allGenres: gendersList } = useSelector(state => state.genders);

    const localFavorites = JSON.parse(localStorage.getItem('favorites'));

    useEffect(() => {
        if (showGenreFilter) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showGenreFilter]);

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
        filtering(yearFilter, genreSelected);
    }, [dispatch, gendersList, yearFilter, genreSelected]);

    const settingGenres = async () => {
        const genres = await settingGenresList(gendersList);
        setGenders(genres);
    }

    const handleShowGenreFilter = () => {
        setShowGenreFilter(true);
    }

    const handleHideGenreFilter = () => {
        setShowGenreFilter(false);
    }

    const handleClickOutside = (event) => {
        if (genreRef.current && genreRef.current.contains(event.target)) {
            // inside click
            return;
        }
        // outside click
        setShowGenreFilter(false);
    };

    const filtering = async (selectedYear, selectedGenre) => {
        const movieGenreID = await getMovieGenreId(selectedGenre);
        const serieGenreID = await getSerieGenreId(selectedGenre);

        if (selectedYear === '' && selectedGenre === '') {
            setFavorites(localFavorites);
        } else if ((selectedYear !== '' || selectedYear !== 'Seleccione...') && selectedGenre === '') {
            let yearFiltered = [];

            for (const favorite of favorites) {
                if (favorite.release_date) {
                    const yearRelease = favorite.release_date.substring(0, 4);
                    if (yearRelease === selectedYear) {
                        yearFiltered.push(favorite);
                    }
                } else if (favorite.first_air_date) {
                    const yearAirDate = favorite.first_air_date.substring(0, 4);
                    if (yearAirDate === selectedYear) {
                        yearFiltered.push(favorite);
                    }
                }
            }

            setFiltered(yearFiltered);
            setFavorites(filtered);
            setTotalMovieResults(filtered.length);
        } else if ((selectedYear === '' || selectedYear === 'Seleccione...') && selectedGenre !== '') {
            let genreFiltered = [];
            for (const favorite of favorites) {
                const genres = favorite.genre_ids;
                for (const genre of genres) {
                    if ((movieGenreID === genre) || (serieGenreID === genre)) {
                        genreFiltered.push(favorite);
                    }
                }
            }

            setFiltered(genreFiltered);
            setFavorites(filtered);
            setTotalMovieResults(filtered.length);
        } else {
            let allFiltered = [];

            for (const favorite of favorites) {
                if (favorite.release_date) {
                    const yearRelease = favorite.release_date.substring(0, 4);
                    const genres = favorite.genre_ids;
                    for (const genre of genres) {
                        if ((movieGenreID === genre) && (yearRelease === selectedYear)) {
                            allFiltered.push(favorite);
                        }
                    }
                } else if (favorite.first_air_date) {
                    const yearAirDate = favorite.first_air_date.substring(0, 4);
                    const genres = favorite.genre_ids;
                    for (const genre of genres) {
                        if ((serieGenreID === genre) && (yearAirDate === selectedYear)) {
                            allFiltered.push(favorite);
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