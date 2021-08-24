import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getMovies } from '../redux/actions/movies';
import { getGenders } from '../redux/actions/genders';
import { getSeries } from '../redux/actions/series';
import MainRouter from '../routes/MainRouter';

const Main = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies());
        dispatch(getSeries());
        dispatch(getGenders());
    }, [dispatch]);

    return (
        <MainRouter />
    )
}

export default Main;