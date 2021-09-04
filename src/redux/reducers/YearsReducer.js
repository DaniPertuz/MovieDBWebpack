import { types } from '../../types/types';

const initialState = { moviesYears: [], seriesYears: [], allYears: [] };

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

        case types.allYearsRead:
            return {
                ...state,
                allYears: [...payload]
            }

        case types.addYear: {
            return {
                ...state,
                allYears: [...state.allYears, payload]
            }
        }

        default:
            return state;
    }
}