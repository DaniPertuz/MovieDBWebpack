import { gettingAllYears, getYearsMovies, getYearsSeries } from '../../helpers/years';
import { types } from '../../types/types';

export const getMoviesYears = () => {
    return async (dispatch) => {
        try {
            const years = await getYearsMovies();
            dispatch(loadingYearsMovies(years));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingYearsMovies = (years) => ({
    type: types.moviesYearsRead,
    payload: years
});

export const getSeriesYears = () => {
    return async (dispatch) => {
        try {
            const years = await getYearsSeries();
            dispatch(loadingYearsSeries(years));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingYearsSeries = (years) => ({
    type: types.seriesYearsRead,
    payload: years
});

export const addYears = (years) => {
    return async (dispatch) => {
        try {
            dispatch(addingYears(years));
        } catch (error) {
            console.log(error);
        }
    }
}

const addingYears = (years) => ({
    type: types.addYear,
    payload: years
});

export const getAllYears = () => {
    return async (dispatch, getState) => {
        const { years } = getState();
        try {
            const genres = await gettingAllYears(years.allYears);

            dispatch(loadingAllYears(genres));
        } catch (error) {
            console.log(error);
        }
    }
}

const loadingAllYears = (years) => ({
    type: types.allYearsRead,
    payload: years
});