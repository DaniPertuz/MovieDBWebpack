import axios from 'axios';
import { GET_SERIES } from '../../fetch/urls';
import { types } from '../../types/types';

export const getSeries = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(GET_SERIES);
            const series = await resp.data.results;
            dispatch(loadingSeries(series));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingSeries = (series) => ({
    type: types.seriesRead,
    payload: series
});