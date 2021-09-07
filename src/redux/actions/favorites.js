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
            // dispatch(favoriteAddNew(favorite));
            const localFavorites = JSON.parse(localStorage.getItem('favorites'));
            console.log(localFavorites);
            const addingLocalFavorite = [...localFavorites, favorite];
            console.log(addingLocalFavorite);
            localStorage.setItem('favorites', JSON.stringify(addingLocalFavorite));
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
            const localFavoritesToDelete = JSON.parse(localStorage.getItem('favorites'));
            const deleted = localFavoritesToDelete.filter(fav => fav.id !== id);
            console.log(typeof deleted);
            localStorage.setItem('favorites', JSON.stringify(deleted));
        } catch (error) {
            console.error(error);
        }
    }
}

const favoriteDeleting = (id) => ({
    type: types.favoritesDelete,
    payload: id
});