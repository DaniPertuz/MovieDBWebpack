import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getGenres } from '../helpers/genres';
import favorite from '../assets/favorite.png';
import { addFavorite } from '../redux/actions/favorites';

const MovieItem = ({ id, poster_path, title, overview, vote_average, genre_ids, release_date, video }) => {

    const dispatch = useDispatch();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        settingGenres();
    }, [genre_ids]);

    const settingGenres = async () => {
        const resp = await getGenres(genre_ids);
        setGenres(resp);
    }

    const isVideo = () => {
        if (!video) {
            Swal.fire('Lo sentimos', 'No hay tráiler para esta película', 'warning');
        }
    }

    const addingFavorite = () => {
        const itemMovie = { id, poster_path, title, overview, vote_average, genre_ids, release_date };
        dispatch(addFavorite(itemMovie));
        Swal.fire('Éxito', 'Película agregada a favoritos', 'success');
    }

    return (
        <div className="container-card">
            <div className="card">
                <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={title} />
                <h5 className="card-title">{title}</h5>
                <h5 className="card-subtitle">{vote_average}</h5>
                <p className="card-text-release">{release_date}</p>
                <p className="card-text-genres">{genres}</p>
                <p className="card-text-overview">{overview.length > 200 ? overview.substr(0, 199) + '...' : overview}</p>
                <button
                    className="button-trailer"
                    onClick={isVideo}
                >
                    Ver trailer
                </button>
                <button
                    className="button-favorite"
                    onClick={addingFavorite}
                >
                    Agregar a favoritos
                    <img src={favorite} alt="favorite" className="favIcon" />
                </button>
            </div>
        </div>
    )
}

export default MovieItem;