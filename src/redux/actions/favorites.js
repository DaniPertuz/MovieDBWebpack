import { types } from '../../types/types';

export const getFavorites = () => {
    return async () => {
        try {
            const localFavorites = JSON.parse(localStorage.getItem('favorites'));
            localStorage.setItem('favorites', JSON.stringify(localFavorites));
        } catch (error) {
            console.log(error);
        }
    }
}

export const addFavorite = (favorite) => {
    return async () => {
        try {
            const localFavorites = JSON.parse(localStorage.getItem('favorites'));
            const addingLocalFavorite = [...localFavorites, favorite];
            localStorage.setItem('favorites', JSON.stringify(addingLocalFavorite));
        } catch (error) {
            console.error(error);
        }
    }
}

export const deleteFavorite = (id) => {
    return async () => {
        try {
            const localFavoritesToDelete = JSON.parse(localStorage.getItem('favorites'));
            const deleted = localFavoritesToDelete.filter(fav => fav.id !== id);
            localStorage.setItem('favorites', JSON.stringify(deleted));
        } catch (error) {
            console.error(error);
        }
    }
}