import { types } from '../../types/types';

const initialState = [];

const SerieReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case types.seriesReading:
        return {
            ...state,
            data: [...payload]
        }

    default:
        return state;
    }
}

export default SerieReducer;