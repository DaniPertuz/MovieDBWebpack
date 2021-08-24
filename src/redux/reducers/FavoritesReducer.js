import { types } from '../../types/types';

const initialState = {
    data: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.favoritesRead:
            return {
                ...state,
                data: [...payload]
            }

        case types.favoritesAdd:
            return {
                ...state,
                data: [...state.data, payload]
            }

        default:
            return state;
    }
}
