import axios from 'axios';
import { GET_MOVIES } from '../../fetch/urls';
import { types } from '../../types/types';

export const getMovies = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_MOVIES);
            const body = await response.data.results;

            dispatch(loadingMovies(body));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingMovies = (movies) => ({
    type: types.moviesReading,
    payload: movies
});