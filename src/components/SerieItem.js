import React, { useEffect, useState } from 'react';
import { getGenres } from '../helpers/genres';
import Swal from 'sweetalert2';

const SerieItem = ({ poster_path, name, overview, vote_average, genre_ids, first_air_date }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres(genre_ids)
            .then(data => setGenres(data));
    }, []);

    const addFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));

        const item = { poster_path, name, overview, vote_average, genre_ids, first_air_date };

        localStorage.setItem('favorites', JSON.stringify([...favorites, item]));

        Swal.fire('Éxito', 'Serie agregada a favoritos', 'success');
    }

    const isVideo = () => {
        Swal.fire('Lo sentimos', 'No hay tráiler para esta serie', 'warning');
    }

    return (
        <div className="container-card">
            <div className="card">
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={name} />
                <h5 className="card-title">{name}</h5>
                <h5 className="card-subtitle">{vote_average}</h5>
                <p className="card-text">{first_air_date}</p>
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

export default SerieItem;