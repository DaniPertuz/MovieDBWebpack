import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { GET_SERIES } from '../fetch/urls';
import { getAllSeries } from '../helpers/fetchData';
import { searchItems } from '../helpers/search';
import { Labels } from './Labels';
import Pagination from './Pagination';
import { SearchList } from './SearchList';
import SeriesList from './SeriesList';
import { getSerieGenreId } from '../helpers/genres';

const Series = () => {

    const [series, setSeries] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [yearFilter, setYearFilter] = useState('');

    const [showGenreFilter, setShowGenreFilter] = useState(false);

    const [genreSelected, setGenreSelected] = useState('');

    const [genders, setGenders] = useState([]);

    const [years, setYears] = useState([]);

    const [totalResults, setTotalResults] = useState('');

    const [totalSeriesResults, setTotalSeriesResults] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const [seriesPerPage] = useState(20);

    const [results, setResults] = useState([]);

    const { data: seriesList } = useSelector(state => state.series);

    const { seriesGenres: gendersList } = useSelector(state => state.genders);

    const { seriesYears } = useSelector(state => state.years);

    useEffect(() => {
        setSeries(seriesList);
        setGenders(gendersList);
        setYears(seriesYears);
        settingTotalSeriesResults();
        filtering(yearFilter, genreSelected);
    }, [seriesList, gendersList, seriesYears, yearFilter, genreSelected]);

    const filtering = async (selectedYear, selectedGenre) => {
        const allSeries = await getAllSeries();
        const genreID = await getSerieGenreId(selectedGenre);

        if (selectedYear === '' && selectedGenre === '') {
            setSeries(seriesList);
            settingTotalSeriesResults(seriesList.length);
        } else if ((selectedYear !== '' || selectedYear !== 'Seleccione...') && selectedGenre === '') {
            let yearFiltered = [];

            for (const serie of allSeries) {
                if (serie.first_air_date) {
                    const year = serie.first_air_date.substring(0, 4);
                    if (year === selectedYear) {
                        yearFiltered.push(serie);
                    }
                }
            }

            setFiltered(yearFiltered);
            setSeries(filtered);
            settingTotalSeriesResults(filtered.length);
        } else if ((selectedYear === '' || selectedYear === 'Seleccione...') && selectedGenre !== '') {
            let genreFiltered = [];

            for (const serie of allSeries) {
                const genres = serie.genre_ids;
                for (const genre of genres) {
                    if (genreID === genre) {
                        genreFiltered.push(serie);
                    }
                }
            }

            setFiltered(genreFiltered);
            setSeries(filtered);
            settingTotalSeriesResults(filtered.length);
        } else {
            let allFiltered = [];

            for (const serie of allSeries) {
                if (serie.first_air_date) {
                    const genres = serie.genre_ids;
                    for (const genre of genres) {
                        if ((genreID === genre) && (serie.first_air_date.substring(0, 4) === selectedYear)) {
                            allFiltered.push(serie);
                        }
                    }
                }
            }

            setFiltered(allFiltered);
            setSeries(filtered);
            settingTotalSeriesResults(filtered.length);
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

    const settingTotalSeriesResults = async () => {
        const next = await axios.get(GET_SERIES);
        const data = await next.data.total_pages;
        setTotalSeriesResults(data);
    }

    const nextPage = async (pageNumber) => {
        const next = await axios.get(GET_SERIES + `&page=${pageNumber}`);
        const data = await next.data.results;
        setSeries(data);
        setCurrentPage(pageNumber);
    }

    const numberPages = Math.floor(totalSeriesResults / seriesPerPage);
    const last = currentPage * seriesPerPage;
    const first = last - seriesPerPage;
    const currentSeries = (filtered.length !== 0) ? filtered.slice(first, last) : series;

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
                                <SeriesList series={currentSeries} />
                                :
                                <SeriesList series={series} />
                            }
                        </div>
                        <div style={{ clear: 'both' }}></div>
                        {(totalSeriesResults >= seriesPerPage) &&
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

export default Series;