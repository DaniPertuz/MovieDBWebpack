import axios from 'axios';
import { GET_MOVIES, GET_SERIES } from '../fetch/urls';

export const getYearsMovies = async () => {
    const resp = await axios.get(GET_MOVIES);
    const total_pages = await resp.data.total_pages;

    let years = [];
    for (let i = 1; i <= total_pages; i++) {
        const response = await axios.get(GET_MOVIES + `&page=${i}`);
        const movies = await response.data.results;
        for (const movie of movies) {
            const year = movie.release_date;
            if (year || year !== undefined) {
                const onlyYear = year.substring(0, 4);
                years.push(onlyYear);
            }
        }
    }

    years.sort();
    years.reverse();

    const uniques = years.filter((v, i, a) => a.indexOf(v) === i);

    return uniques;
}

export const getYearsSeries = async () => {
    const resp = await axios.get(GET_SERIES);
    const total_pages = await resp.data.total_pages;

    let years = [];
    for (let i = 1; i <= total_pages; i++) {
        const response = await axios.get(GET_SERIES + `&page=${i}`);
        const series = await response.data.results;
        for (const serie of series) {
            const year = serie.first_air_date;
            if (year || year !== undefined) {
                const onlyYear = year.substring(0, 4);
                years.push(onlyYear);
            }
        }
    }

    years.sort();
    years.reverse();

    const uniques = years.filter((v, i, a) => a.indexOf(v) === i);

    return uniques;
}

export const gettingAllYears = (years = []) => {
    years.sort();
    years.reverse();

    const uniques = years.filter((v, i, a) => a.indexOf(v) === i);

    return uniques;
}