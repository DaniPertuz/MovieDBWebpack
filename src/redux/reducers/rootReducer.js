import { combineReducers } from 'redux';
import GenderReducer from './GenderReducer';
import MovieReducer from './MovieReducer';
import SeriesReducer from './SeriesReducer';
import YearsReducer from './YearsReducer';

export const rootReducer = combineReducers({
    movies: MovieReducer,
    series: SeriesReducer,
    genders: GenderReducer,
    years: YearsReducer
});