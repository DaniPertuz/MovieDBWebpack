import { types } from '../../types/types';

const initialState = { moviesGenres: [], seriesGenres: [], allGenres: [] };

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.moviesGenresRead:
            return {
                ...state,
                moviesGenres: [...payload]
            }

        case types.seriesGenresRead:
            return {
                ...state,
                seriesGenres: [...payload]
            }
        
        case types.addGenre: {
            return {
                ...state,
                allGenres: [...state.allGenres, payload]
            }
        }

        case types.allGenresRead:
            return {
                ...state,
                allGenres: [...payload]
            }

        default:
            return state;
    }
}
