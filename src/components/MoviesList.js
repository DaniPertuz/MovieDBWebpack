import React from 'react';
import MovieItem from './MovieItem';

const MoviesList = ({ movies = [] }) => {
    return (
        <>
            {(movies.length === 0)
                ?
                <h3 className="text-center">No hay películas</h3>
                :
                movies.map((item, index) => (
                    <MovieItem
                        key={index}
                        {...item}
                    />
                ))}
        </>
    )
}

export default MoviesList;