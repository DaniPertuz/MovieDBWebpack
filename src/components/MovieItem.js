import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGenres } from '../helpers/genres';
import Swal from 'sweetalert2';

const MovieItem = ({ poster_path, title, overview, vote_average, genre_ids, release_date, video }) => {

    const dispatch = useDispatch();

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres(genre_ids)
            .then(data => setGenres(data));
    }, []);

    const addFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));

        const item = { poster_path, title, overview, vote_average, genre_ids, release_date };

        localStorage.setItem('favorites', JSON.stringify([...favorites, item]));

        Swal.fire('Éxito', 'Película agregada a favoritos', 'success');
    }

    const isVideo = () => {
        if (!video) {
            Swal.fire('Lo sentimos', 'No hay tráiler para esta película', 'warning');
        }
    }

    return (
        <div className="container-card">
            <div className="card">
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={title} />
                <h5 className="card-title">{title}</h5>
                <h5 className="card-subtitle">{vote_average}</h5>
                <p className="card-text">{release_date}</p>
                <p className="card-text">{genres}</p>
                <p className="card-text-overview">{overview.length > 200 ? overview.substr(0, 199) + '...' : overview}</p>
                <button
                    className="button-trailer"
                    onClick={isVideo}
                >
                    Ver trailer
                </button>
                <button
                    className="button-favorite"
                    onClick={addFavorite}
                >
                    Agregar a favoritos
                </button>
            </div>
        </div>
    )
}

export default MovieItem;