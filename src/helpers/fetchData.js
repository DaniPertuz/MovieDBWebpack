import axios from 'axios';
import { GET_MOVIES, GET_SERIES } from '../fetch/urls';

export const getAllMovies = async () => {
    let allMovies = [];
    const resp = await axios.get(GET_MOVIES);
    const total_pages = await resp.data.total_pages;
    for (let i = 1; i <= total_pages; i++) {
        const response = await axios.get(GET_MOVIES + `&page=${i}`);
        const movies = await response.data.results;
        for (const movie of movies) {
            allMovies.push(movie);
        }
    }
    return allMovies;
}

export const getAllSeries = async () => {
    let allSeries = [];
    const resp = await axios.get(GET_SERIES);
    const total_pages = await resp.data.total_pages;
    for (let i = 1; i <= total_pages; i++) {
        const response = await axios.get(GET_SERIES + `&page=${i}`);
        const series = await response.data.results;
        for (const serie of series) {
            allSeries.push(serie);
        }
    }
    return allSeries;
}