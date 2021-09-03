import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import favorite from '../assets/favorite.png';
import noPoster from '../assets/no-poster.jpeg';
import { getGenres } from '../helpers/genres';
import { addFavorite } from '../redux/actions/favorites';

const SerieItem = ({ id, poster_path, name, overview, vote_average, genre_ids, first_air_date, video }) => {

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
            Swal.fire('Lo sentimos', 'No hay tráiler para esta serie', 'warning');
        }
    }

    const addingFavorite = () => {
        const itemSeries = { id, poster_path, name, overview, vote_average, genre_ids, first_air_date };
        dispatch(addFavorite(itemSeries));
        Swal.fire('Éxito', 'Serie agregada a favoritos', 'success');
    }

    return (
        <div className="container-card">
            <div className="card">
                {poster_path
                    ?
                    <img src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={name} />
                    :
                    <img src={noPoster} alt={name} />
                }
                <h5 className="card-title">{name}</h5>
                <h5 className="card-subtitle">{vote_average}</h5>
                <p className="card-text-release">{first_air_date}</p>
                {(genres === "")
                    ?
                    <p className="card-text-genres">{"Sin género"}</p>
                    :
                    <p className="card-text-genres">{genres}</p>
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
                    onClick={addingFavorite}
                >
                    Agregar a favoritos
                    <img src={favorite} alt="favorite" className="favIcon" />
                </button>
            </div>
        </div>
    )
}

export default SerieItem;