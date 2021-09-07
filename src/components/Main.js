import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainRouter from '../routes/MainRouter';
import { getMovies } from '../redux/actions/movies';
import { getAllGenres, getGendersMovies, getGendersSeries } from '../redux/actions/genders';
import { getSeries } from '../redux/actions/series';
import { getFavorites } from '../redux/actions/favorites';
import { getAllYears, getMoviesYears, getSeriesYears } from '../redux/actions/years';

const Main = () => {

    localStorage.setItem('favorites', JSON.stringify([]));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies());
        dispatch(getSeries());
        dispatch(getGendersMovies());
        dispatch(getGendersSeries());
        dispatch(getAllGenres());
        dispatch(getAllYears());
        dispatch(getFavorites());
        dispatch(getMoviesYears());
        dispatch(getSeriesYears());
    }, [dispatch]);

    return (
        <MainRouter />
    )
}

export default Main;