import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { getGenres } from '../helpers/genres';

const SerieItem = ({ id, poster_path, name, overview, vote_average, genre_ids, first_air_date, video }) => {
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
        const itemSeries = { id, poster_path, name, overview, vote_average, genre_ids, first_air_date };

        window.$favorites = [...window.$favorites, itemSeries];

        Swal.fire('Éxito', 'Película agregada a favoritos', 'success');
    }

    return (
        <div className="container-card">
            <div className="card">
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={name} />
                <h5 className="card-title">{name}</h5>
                <h5 className="card-subtitle">{vote_average}</h5>
                <p className="card-text">{first_air_date}</p>
                {(genres === "")
                ?
                <p className="card-text">{"Sin género"}</p>
                :
                <p className="card-text">{genres}</p>
            }
                {(overview === "")
                    ?
                    <p className="card-text-overview">{"Sin descripción"}</p>
                    :
                    <p className="card-text-overview">{overview.length > 200 ? overview.substr(0, 199) + '...' : overview}</p>
                }
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