import { types } from '../../types/types';

const initialState = { moviesYears: [], seriesYears: [] };

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case types.moviesYearsRead:
        return {
            ...state,
            moviesYears: [...payload]
        }
    case types.seriesYearsRead:
        return {
            ...state,
            seriesYears: [...payload]
        }

    default:
        return state;
    }
}