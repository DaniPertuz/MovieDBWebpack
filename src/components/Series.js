import React, { useEffect, useState } from 'react';
import { getAllSeries } from '../helpers/fetchData';
import { genresList } from '../helpers/genres';
import { getYearsSeries } from '../helpers/years';
import { Labels } from './Labels';
import SerieItem from './SerieItem';

const Series = () => {

    const [series, setSeries] = useState([]);

    const [years, setYears] = useState([]);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // dispatch(getSeries());
        // setSeries(data);
        getAllSeries().then((series) => setSeries(series));
        genresList().then((genres) => setGenres(genres));
        getYearsSeries().then((years) => setYears(years));
    }, []);

    const filterByGender = (e) => {
        const selectedGender = e.target.value;
        let filtered = [];

        for (const serie of data) {
            const genders = serie.genre_ids;
            for (const gender of genders) {
                if (Number(selectedGender) === gender) {
                    filtered.push(serie);
                }
            }
        }

        if (selectedGender === 'Seleccione...') {
            filtered = data;
        }

        setSeries(filtered);
    }

    const filterByYear = (e) => {
        const selectedYear = e.target.value;
        let filtered = [];

        for (const serie of data) {
            const releaseYear = serie.first_air_date.substring(0, 4);
            if (selectedYear === releaseYear) {
                filtered.push(serie);
            }
        }

        if (selectedYear === 'Seleccione...') {
            filtered = data;
        }

        setSeries(filtered);
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
                                <option key={index}>
                                    {year}
                                </option>
                            ))
                        }
                    </select>
                    <select
                        id="comboGenre"
                        name="genre"
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
                {series && (series.length !== 0)
                    ? series.map((serie) =>
                        <SerieItem
                            key={serie.id}
                            {...serie}
                        />
                    )
                    :
                    <h3 className="text-center">No hay series...</h3>
                }
            </div>
        </>
    )
}

export default Series;