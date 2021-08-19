import React, { useEffect, useState } from 'react';
import { getGenres } from '../helpers/genres';

const FavoriteItem = ({ poster_path, name, overview, vote_average, genre_ids, first_air_date }) => {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres(genre_ids)
            .then(data => setGenres(data));
    }, []);

    return (
        <div className="card">
            <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={name} />
            <h5 className="card-title">{name}</h5>
            <h5 className="card-subtitle">{vote_average}</h5>
            <p className="card-text">{first_air_date}</p>
            <p className="card-text">{genres}</p>
            <p className="card-text-overview">{overview.length > 250 ? overview.substr(0, 249) + '...' : overview}</p>
            <div className="container-buttons">
                <button
                    className="button-trailer"
                >
                    Ver trailer
                </button>
                <button
                    className="button-favorite"
                >
                    Eliminar de favoritos
                </button>
            </div>
        </div>
    )
}

export default FavoriteItem;