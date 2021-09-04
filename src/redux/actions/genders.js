import axios from 'axios';
import { GET_GENRES_MOVIES, GET_GENRES_SERIES } from '../../fetch/urls';
import { genresList } from '../../helpers/genres';
import { types } from '../../types/types';

export const getGendersMovies = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(GET_GENRES_MOVIES);
            const genders = await resp.data.genres;

            dispatch(loadingGendersMovies(genders));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingGendersMovies = (genders) => ({
    type: types.moviesGenresRead,
    payload: genders
});

export const getGendersSeries = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(GET_GENRES_SERIES);
            const genders = await resp.data.genres;

            dispatch(loadingGendersSeries(genders));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingGendersSeries = (genders) => ({
    type: types.seriesGenresRead,
    payload: genders
});

export const addGenres = (genres) => {
    return async (dispatch) => {
        try {
            dispatch(addingGenres(genres));
        } catch (error) {
            console.log(error);
        }
    }
}

const addingGenres = (genres) => ({
    type: types.addGenre,
    payload: genres
});

export const getAllGenres = () => {
    return async (dispatch, getState) => {
        const { genders } = getState();
        try {
            const genres = await genresList(genders.allGenres);

            dispatch(loadingAllGenders(genres));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingAllGenders = (genders) => ({
    type: types.allGenresRead,
    payload: genders
});