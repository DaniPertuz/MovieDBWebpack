import { getYearsMovies, getYearsSeries } from '../../helpers/years';
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