import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteFavorite } from '../redux/actions/favorites';
import favorite from '../assets/favorite.png';
import { getGenresMovies, getGenresSeries } from '../helpers/genres';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const FavoriteItem = ({ id, poster_path, title, name, overview, vote_average, genre_ids, first_air_date, release_date, media_type }) => {

    const history = useHistory();

    const dispatch = useDispatch();

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        settingGenres();
    }, [dispatch, genre_ids]);

    const settingGenres = async () => {
        let genresMovie, genresSerie;
        genresMovie = await getGenresMovies(genre_ids);
        genresSerie = await getGenresSeries(genre_ids);

        if (title) {
            setGenres(genresMovie);
        } else {
            setGenres(genresSerie);
        }
    }

    const getVideo = async () => {
        try {
            let url = '';

            if (name) {
                url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=cc0b90931467ae243564a690969b3b99&language=es`;
            } else {
                url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=cc0b90931467ae243564a690969b3b99&language=es`;
            }

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
                if (media_type === 'tv') {
                    Swal.fire('Lo sentimos', 'No hay tráiler para esta serie', 'warning');
                } else {
                    Swal.fire('Lo sentimos', 'No hay tráiler para esta película', 'warning');
                }
            }
        } catch (error) {
            if (media_type === 'tv') {
                Swal.fire('Lo sentimos', 'No hay tráiler para esta serie', 'warning');
            } else {
                Swal.fire('Lo sentimos', 'No hay tráiler para esta película', 'warning');
            }
        }
    }

    const removeFavorite = () => {
        dispatch(deleteFavorite(id));
        history.replace('/');
        Swal.fire('Borrado', 'Elemento eliminado de favoritos', 'success');
    }

    return (
        <div className="card">
            <img className="card-img" src={"https://image.tmdb.org/t/p/w500" + poster_path} alt={name} />
            <div className="card-body">
                <div className="card-header">
                    {name &&
                        <h5 className="card-title">{name}</h5>
                    }
                    {title &&
                        <h5 className="card-title">{title}</h5>
                    }
                    <h5 className="card-subtitle">{vote_average}</h5>
                </div>
                <div className="card-subheader">
                    {first_air_date &&
                        <p className="card-text-release">{first_air_date}</p>
                    }
                    {release_date &&
                        <p className="card-text-release">{release_date}</p>
                    }
                    <p className="card-text-genres">{genres}</p>
                </div>
                <div className="card-text">
                    {overview
                        ?
                        <p className="card-text-overview">{overview.length > 200 ? overview.substr(0, 199) + '...' : overview}</p>
                        :
                        <p className="card-text-overview">Sin descripción</p>
                    }
                </div>
                <div className="card-buttons">
                    <button
                        className="button-trailer"
                        onClick={getVideo}
                    >
                        Ver Trailer
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
        </div>
    )
}

export default FavoriteItem;