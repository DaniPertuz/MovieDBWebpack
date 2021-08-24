import { types } from '../../types/types';

const initialState = { data: [] };

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case types.seriesRead:
        return {
            ...state,
            data: [...payload]
        }

    default:
        return state;
    }
}