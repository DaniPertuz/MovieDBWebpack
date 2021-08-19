import axios from 'axios';
import { GET_MOVIES, GET_SERIES } from '../fetch/urls';

let allYears = [];

export const getYearsMovies = async () => {
    const resp = await axios.get(GET_MOVIES);
    const movies = await resp.data.results;

    let years = [];

    for (const movie of movies) {
        const year = movie.release_date;
        years.push(year.substring(0, 4));
        allYears.push(year.substring(0, 4));
    }

    years.sort();
    years.reverse();

    const uniques = years.filter((v, i, a) => a.indexOf(v) === i);

    return uniques;
}

export const getYearsSeries = async () => {
    const resp = await axios.get(GET_SERIES);
    const series = await resp.data.results;

    let years = [];

    for (const serie of series) {
        const year = serie.first_air_date;
        years.push(year.substring(0, 4));
        allYears.push(year.substring(0, 4));
    }

    years.sort();
    years.reverse();

    const uniques = years.filter((v, i, a) => a.indexOf(v) === i);

    return uniques;
}

export const getYearsAll = async () => {
    return allYears.filter((v, i, a) => a.indexOf(v) === i);
}