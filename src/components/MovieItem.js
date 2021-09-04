import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';

import { getGenresMovies } from '../helpers/genres';
import favorite from '../assets/favorite.png';
import { addFavorite } from '../redux/actions/favorites';
import { addGenres } from '../redux/actions/genders';
import { addYears } from '../redux/actions/years';

const MovieItem = ({ id, poster_path, title, overview, vote_average, genre_ids, release_date }) => {

    const dispatch = useDispatch();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        settingGenres();
    }, [genre_ids]);

    const settingGenres = async () => {
        const resp = await getGenresMovies(genre_ids);
        setGenres(resp);
    }

    const getVideo = async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=cc0b90931467ae243564a690969b3b99&language=es`;
        
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
            Swal.fire('Lo sentimos', 'No hay tráiler para esta película', 'warning');
        }
    }

    const addingFavorite = () => {
        const itemMovie = { id, poster_path, title, overview, vote_average, genre_ids, release_date };
        dispatch(addFavorite(itemMovie));
        dispatch(addGenres(genre_ids));
        dispatch(addYears(release_date.substring(0, 4)));
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

export default MovieItem;