import { types } from '../../types/types';

const initialState = [];

const MovieReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case types.moviesReading:
            return {
                ...state,
                data: [...payload]
            }
        default:
            return state;
    }
}

export default MovieReducer;