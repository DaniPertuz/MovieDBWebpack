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

const Series = () => {

    const [series, setSeries] = useState([]);

    const [filtered] = useState([]);

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
    }, [seriesList, gendersList, seriesYears]);

    const filterByGender = async (e) => {
        const selectedGender = e.target.value;
        const allSeries = await getAllSeries();
        filtered.length = 0;
        
        if (selectedGender === 'Seleccione...') {
            setSeries(seriesList);
            setTotalSeriesResults(seriesList.length);
        } else {
            for (const serie of allSeries) {
                const genders = serie.genre_ids;
                for (const gender of genders) {
                    if (Number(selectedGender) === gender) {
                        filtered.push(serie);
                    }
                }
            }
            setSeries(filtered);
            setTotalSeriesResults(filtered.length);
        }
    }

    const filterByYear = async (e) => {
        const selectedYear = e.target.value;
        const allSeries = await getAllSeries();
        filtered.length = 0;

        if (selectedYear === 'Seleccione...') {
            setSeries(seriesList);
            setTotalSeriesResults(seriesList.length);
        } else {
            for (const serie of allSeries) {
                if (serie.first_air_date) {
                    const releaseYear = serie.first_air_date.substring(0, 4);
                    if (selectedYear === releaseYear) {
                        filtered.push(serie);
                    }
                }
            }
            setSeries(filtered);
            setTotalSeriesResults(filtered.length);
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
                            <SeriesList series={currentSeries} />
                            :
                            <SeriesList series={series} />
                        }
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