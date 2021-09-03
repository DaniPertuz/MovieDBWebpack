import { types } from '../../types/types';

export const getFavorites = () => {
    return async (dispatch, getState) => {
        try {
            const { favorites } = getState();
            dispatch(loadingFavorites(favorites.data));
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

export const deleteFavorite = (id) => {
    return async (dispatch) => {
        try {
            dispatch(favoriteDeleting(id));
        } catch (error) {
            console.error(error);
        }
    }
}

const favoriteDeleting = (id) => ({
    type: types.favoritesDelete,
    payload: id
});