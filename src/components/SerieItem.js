import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import favorite from '../assets/favorite.png';
import noPoster from '../assets/no-poster.jpeg';
import { getGenresSeries } from '../helpers/genres';
import { addFavorite } from '../redux/actions/favorites';
import { addGenres } from '../redux/actions/genders';

const SerieItem = ({ id, poster_path, name, overview, vote_average, genre_ids, first_air_date, video }) => {

    const dispatch = useDispatch();

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        settingGenres();
    }, [genre_ids]);

    const settingGenres = async () => {
        const resp = await getGenresSeries(genre_ids);
        setGenres(resp);
    }

    const getVideo = async () => {
        const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=cc0b90931467ae243564a690969b3b99&language=es`;
 
        const response = await axios.get(url);
        const results = await response.data.results;
        const result = results.find(result => result.type === "Trailer" && result.site === "YouTube");
 
        if (result) {
            Swal.fire({
                title: 'Trailer',
                html:
                    `<iframe width="470" height="315" src="https://www.youtube.com/embed/${result.key}" frameborder="0" allowfullscreen></iframe>`
            });
        } else {
            Swal.fire('Lo sentimos', 'No hay tráiler para esta serie', 'warning');
        }
    }

    const addingFavorite = () => {
        const itemSeries = { id, poster_path, name, overview, vote_average, genre_ids, first_air_date };
        dispatch(addFavorite(itemSeries));
        dispatch(addGenres(genre_ids));
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
                    onClick={getVideo}
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