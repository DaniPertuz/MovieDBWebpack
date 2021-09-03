import React from 'react';
import MovieItem from './MovieItem';

const MoviesList = ({ movies = [] }) => {
    return (
        <>
            {movies.map((item, index) => (
                <MovieItem
                    key={index}
                    {...item}
                />
            ))}
        </>
    )
}

export default MoviesList;