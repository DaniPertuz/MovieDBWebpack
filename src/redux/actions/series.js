import axios from 'axios';
import { GET_SERIES } from '../../fetch/urls';
import { types } from '../../types/types';

export const getSeries = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_SERIES);
            const body = await response.data.results;

            dispatch(loadingSeries(body));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingSeries = (series) => ({
    type: types.seriesReading,
    payload: series
});