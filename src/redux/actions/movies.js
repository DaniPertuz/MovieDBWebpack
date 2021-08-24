import axios from 'axios';
import { GET_MOVIES } from '../../fetch/urls';
import { types } from '../../types/types';

export const getMovies = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(GET_MOVIES);
            const movies = await resp.data.results;
            dispatch(loadingMovies(movies));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingMovies = (movies) => ({
    type: types.moviesRead,
    payload: movies
});