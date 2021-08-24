import React, { useEffect, useState } from 'react';
import { getAllMovies, getAllSeries } from '../helpers/fetchData';
import Filters from './Filters';
import Items from './Items';
import { Labels } from './Labels';
import { searchItems } from '../helpers/search';
import Header from './Header';
import { SearchList } from './SearchList';
import { getYearsSeries } from '../helpers/years';
import { genresList } from '../helpers/genres';

const initialState = { shows: [], favorites: false };

const Main = () => {

    const [movies, setMovies] = useState([]);

    const [series, setSeries] = useState([]);

    const [items, setItems] = useState(initialState);

    const [years, setYears] = useState([]);

    const [genres, setGenres] = useState([]);

    const [totalResults, setTotalResults] = useState('');

    const [results, setResults] = useState([]);

    useEffect(() => {
        getAllSeries().then((series) => setSeries(series));
        getAllMovies().then((movies) => {
            setMovies(movies);
            setItems({
                shows: movies,
                favorites: false
            });
        });
        getYearsSeries()
            .then(years => setYears(years));

        genresList()
            .then(genres => setGenres(genres));
    }, []);

    const goToMovies = () => {
        setItems({
            shows: movies,
            favorites: false
        });
    }

    const goToSeries = () => {
        setItems({
            shows: series,
            favorites: false
        });
    }

    const goToFavorites = () => {
        setItems({
            shows: window.$favorites,
            favorites: true
        });
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

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const item of items.shows) {
            const genders = item.genre_ids;
            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(item);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            getAllMovies().then((movies) => {
                setItems({
                    shows: movies,
                    favorites: false
                });
            });
        }

        setItems({
            shows: filtered,
            favorites: false
        });
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const item of items.shows) {
            if (item.release_date) {
                const releaseYear = item.release_date.substring(0, 4);
                if (selectedYear === releaseYear) {
                    filtered.push(item);
                }
            } else {
                const firstAirDate = item.first_air_date.substring(0, 4);
                if (selectedYear === firstAirDate) {
                    filtered.push(item);
                }
            }
        }

        if (selectedYear === 'Seleccione...') {
            filtered = items.shows;
        }

        setItems({
            shows: filtered,
            favorites: false
        });
    }

    return (
        <>
            <Header
                goToMovies={goToMovies}
                goToSeries={goToSeries}
                goToFavorites={goToFavorites}
            />
            <div className="container-fluid" onSubmit={getSearch}>
                <input
                    type="text"
                    placeholder="Buscar película, serie o video"
                    onChange={getSearch}
                />
            </div>
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

            {
                (totalResults > 0) &&
                    (totalResults === 1)
                    ?
                    <h6 className="results">{totalResults} coincidencia</h6>
                    :
                    (totalResults > 1)
                        ?
                        <h6 className="results">{totalResults} coincidencias</h6>
                        :
                        <></>

            }

            {((totalResults > 0) && (totalResults !== ''))
                ?
                <SearchList results={results} />
                :
                (totalResults === 0)
                    ?
                    <h3 className="text-center">No hay items...</h3>
                    :
                    <Items items={items} />
            }
        </>
    )
}

export default Main;