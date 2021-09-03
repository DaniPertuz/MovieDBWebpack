import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainRouter from '../routes/MainRouter';
import { getMovies } from '../redux/actions/movies';
import { getGenders } from '../redux/actions/genders';
import { getSeries } from '../redux/actions/series';
import { getFavorites } from '../redux/actions/favorites';
import { getMoviesYears, getSeriesYears } from '../redux/actions/years';

const Main = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies());
        dispatch(getSeries());
        dispatch(getGenders());
        dispatch(getFavorites());
        dispatch(getMoviesYears());
        dispatch(getSeriesYears());
    }, [dispatch]);

    return (
        <MainRouter />
    )
}

export default Main;