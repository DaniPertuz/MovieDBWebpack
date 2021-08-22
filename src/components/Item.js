import React, { useEffect, useState } from 'react';
import { getGenres } from '../helpers/genres';
import Swal from 'sweetalert2';

const Item = ({ id, poster_path, name, title, overview, vote_average, genre_ids, release_date, first_air_date, video }) => {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres(genre_ids)
            .then(data => setGenres(data));
    }, []);

    const isVideo = () => {
        if (!video) {
            Swal.fire('Lo sentimos', 'No hay tráiler para esta película', 'warning');
        }
    }

    const addFavorite = () => {
        const favorites = window.$favorites;

        const itemSerie = { id, poster_path, name, overview, vote_average, genre_ids, first_air_date };

        const itemMovie = { id, poster_path, title, overview, vote_average, genre_ids, release_date };

        if (name && first_air_date) {
            window.$favorites = [...favorites, itemSerie];
            Swal.fire('Éxito', 'Serie agregada a favoritos', 'success');
        } else {
            window.$favorites = [...favorites, itemMovie];
            Swal.fire('Éxito', 'Película agregada a favoritos', 'success');
        }
    }

    return (
        <div className="container-card">
            <div className="card">
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={name} />
                
                {
                    name &&
                    <h5 className="card-title">{name}</h5>
                }
                
                {
                    title &&
                    <h5 className="card-title">{title}</h5>
                }

                <h5 className="card-subtitle">{vote_average}</h5>

                {
                    release_date &&
                    <p className="card-text">{release_date}</p>
                }

                {
                    first_air_date &&
                    <p className="card-text">{first_air_date}</p>
                }

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

export default Item;