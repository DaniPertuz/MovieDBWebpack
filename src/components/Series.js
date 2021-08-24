import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../helpers/search';
import { getSeries } from '../redux/actions/series';
import { getSeriesYears } from '../redux/actions/years';
import { Labels } from './Labels';
import { SearchList } from './SearchList';
import SerieItem from './SerieItem';

const Series = () => {

    const dispatch = useDispatch();

    const [series, setSeries] = useState([]);

    const [genders, setGenders] = useState([]);

    const [years, setYears] = useState([]);

    const [totalResults, setTotalResults] = useState('');

    const [results, setResults] = useState([]);

    const { data: seriesList } = useSelector(state => state.series);

    const { data: gendersList } = useSelector(state => state.genders);

    const { seriesYears } = useSelector(state => state.years);

    useEffect(() => {
        dispatch(getSeriesYears());
        setSeries(seriesList);
        setGenders(gendersList);
        setYears(seriesYears);
    }, [dispatch, seriesList, gendersList]);

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const serie of seriesList) {
            const genders = serie.genre_ids;
            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(serie);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            filtered = seriesList;
        }

        setSeries(filtered);
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const serie of seriesList) {
            if (serie.first_air_date) {
                const releaseYear = serie.first_air_date.substring(0, 4);
                if (selectedYear === releaseYear) {
                    filtered.push(serie);
                }
            }
        }

        if (selectedYear === 'Seleccione...') {
            filtered = seriesList;
        }

        setSeries(filtered);
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
                        {series.map((item, index) => (
                            <SerieItem
                                key={index}
                                {...item}
                            />
                        ))}
                    </>
            }
        </>
    )
}

export default Series;