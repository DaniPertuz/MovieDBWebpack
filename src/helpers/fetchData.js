import axios from 'axios';
import { GET_MOVIES, GET_SERIES } from '../fetch/urls';

export const getAllMovies = async () => {
    const resp = await axios.get(GET_MOVIES);
    return await resp.data.results;
}

export const getAllSeries = async () => {
    const resp = await axios.get(GET_SERIES);
    return await resp.data.results;
}