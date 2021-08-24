import { types } from '../../types/types';

export const getFavorites = (favorites) => {
    return async (dispatch) => {
        try {
            dispatch(loadingFavorites(favorites));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingFavorites = (favorites) => ({
    type: types.favoritesRead,
    payload: favorites
});

export const addFavorite = (favorite) => {
    return async (dispatch) => {
        try {
            dispatch(favoriteAddNew(favorite));
        } catch (error) {
            console.error(error);
        }
    }
}

const favoriteAddNew = (favorite) => ({
    type: types.favoritesAdd,
    payload: favorite
});