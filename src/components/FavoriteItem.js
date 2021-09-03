import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getGenres } from '../helpers/genres';
import { deleteFavorite } from '../redux/actions/favorites';
import favorite from '../assets/favorite.png';

const FavoriteItem = ({ id, poster_path, title, name, overview, vote_average, genre_ids, first_air_date, release_date, media_type }) => {

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
        if ((media_type === 'tv')) {
            Swal.fire('Lo sentimos', 'No hay tráiler para esta serie', 'warning');
        } else {
            Swal.fire('Lo sentimos', 'No hay tráiler para esta película', 'warning');
        }
    }

    const removeFavorite = () => {
        dispatch(deleteFavorite(id));
        Swal.fire('Borrado', 'Elemento eliminado de favoritos', 'success');
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
                    <p className="card-text-release">{first_air_date}</p>
                }
                {release_date &&
                    <p className="card-text-release">{release_date}</p>
                }
                <p className="card-text-genres">{genres}</p>
                {overview
                ?
                <p className="card-text-overview">{overview.length > 200 ? overview.substr(0, 199) + '...' : overview}</p>
                :
                <p className="card-text-overview">Sin descripción</p>
                }
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
                    Eliminar favorito
                    <img src={favorite} alt="favorite" className="favIcon" />
                </button>
            </div>
        </div>
    )
}

export default FavoriteItem;