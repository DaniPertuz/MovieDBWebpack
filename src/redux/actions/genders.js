import axios from 'axios';
import { GET_GENRES } from '../../fetch/urls';
import { getGenres } from '../../helpers/genres';
import { types } from '../../types/types';

export const getGenders = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(GET_GENRES);
            const genders = await resp.data.genres;

            dispatch(loadingGenders(genders));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingGenders = (genders) => ({
    type: types.gendersRead,
    payload: genders
});