import React, { useEffect, useState } from 'react';
import { getGenres } from '../helpers/genres';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const FavoriteItem = ({ id, poster_path, title, name, overview, vote_average, genre_ids, first_air_date, release_date }) => {

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

    const removeFavorite = () => {
        const favorites = window.$favorites;

        const favoritesUpdated = favorites.filter(favorite => favorite.id !== id);

        window.$favorites = favoritesUpdated;

        Swal.fire('Atención', 'Item eliminado', 'success');
    }

    return (
        <div className="container-card">
            <div className="card">
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={name} />
                {name &&
                    <h5 className="card-title">{name}</h5>
                }
                {title &&
                    <h5 className="card-title">{title}</h5>
                }
                <h5 className="card-subtitle">{vote_average}</h5>
                {first_air_date &&
                    <p className="card-text">{first_air_date}</p>
                }
                {release_date &&
                    <p className="card-text">{release_date}</p>
                }
                <p className="card-text">{genres}</p>
                <p className="card-text-overview">{overview.length > 250 ? overview.substr(0, 249) + '...' : overview}</p>
                <div className="container-buttons">
                    <button
                        className="button-trailer"
                        onClick={isVideo}
                    >
                        Ver trailer
                    </button>
                    <button
                        className="button-favorite"
                        onClick={removeFavorite}
                    >
                        Eliminar de favoritos
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FavoriteItem;