import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

import favorite from '../assets/favorite.png';
import favoriteMarked from '../assets/favorite-marked.png';
import noPoster from '../assets/no-poster.jpeg';
import { addFavorite } from '../redux/actions/favorites';
import { addGenres } from '../redux/actions/genders';
import { settingGenresList } from '../helpers/genres';
import { addYears } from '../redux/actions/years';

const SearchItem = ({ id, poster_path, name, title, overview, vote_average, genre_ids, first_air_date, release_date, media_type, known_for }) => {

    const dispatch = useDispatch();

    const [genres, setGenres] = useState([]);

    const favorites = JSON.parse(localStorage.getItem('favorites'));

    const marked = favorites.find(favorite => favorite.id === id);

    useEffect(() => {
        settingGenres();
    }, [genre_ids]);

    const settingGenres = async () => {
        const resp = await settingGenresList(genre_ids);
        setGenres(resp);
    }

    const addingFavorite = () => {
        if (media_type === 'tv') {
            const itemSeries = { id, poster_path, name, overview, vote_average, genre_ids, first_air_date };
            dispatch(addFavorite(itemSeries));
            dispatch(addGenres(genre_ids));
            dispatch(addYears(first_air_date.substring(0, 4)));
            Swal.fire('Éxito', 'Serie agregada a favoritos', 'success');
        } else {
            const itemMovie = { id, poster_path, title, overview, vote_average, genre_ids, release_date };
            dispatch(addFavorite(itemMovie));
            dispatch(addGenres(genre_ids));
            dispatch(addYears(release_date.substring(0, 4)));
            Swal.fire('Éxito', 'Película agregada a favoritos', 'success');
        }
    }

    const setVoteAverage = () => {
        if (!vote_average) {
            if (known_for) {
                if (known_for[0]) {
                    return known_for[0].vote_average;
                }
            }
        }
    }

    const setImage = () => {
        if ((poster_path === null) || (poster_path === undefined)) {
            if (known_for) {
                if (known_for[0]) {
                    if (known_for[0].poster_path !== undefined) {
                        return `https://image.tmdb.org/t/p/w500${known_for[0].poster_path}`;
                    } else {
                        return noPoster;
                    }
                } else {
                    return noPoster;
                }
            } else {
                return noPoster;
            }
        } else {
            return `https://image.tmdb.org/t/p/w500${poster_path}`;
        }
    }

    const setDescription = () => {
        if ((overview === null) || (overview === undefined)) {
            if (known_for) {
                if (known_for[0]) {
                    const description = known_for[0].overview;
                    if (description === "") {
                        return 'Sin descripción';
                    } else {
                        return description.substr(0, 199);
                    }
                } else {
                    return 'Sin descripción';
                }
            } else {
                return 'Sin descripción';
            }
        } else if (overview === "") {
            return 'Sin descripción'
        } else {
            return overview.substr(0, 199);
        }
    }

    const setDate = () => {
        if ((release_date === null) || (release_date === undefined) || (release_date === "")
            && ((first_air_date === null) || (first_air_date === undefined) || (first_air_date === ""))) {
            return 'Sin fecha';
        } else if ((release_date === null) || (release_date === undefined)) {
            return first_air_date;
        } else if ((first_air_date === null) || (first_air_date === undefined)) {
            return release_date;
        }
    }

    const getVideo = async () => {
        try {
            let url = '';

            if (media_type === 'tv') {
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

    return (
        <div className="card">
            <div className="card-body">
                <img className="card-img" src={setImage()} alt={name} />
                <div className="card-header">
                    {name &&
                        <h5 className="card-title">{name}</h5>
                    }

                    {title &&
                        <h5 className="card-title">{title}</h5>
                    }

                    <h5 className="card-subtitle">{setVoteAverage()}</h5>
                </div>
                <div className="card-subheader">
                    <p className="card-text-release">{setDate()}</p>
                    <p className="card-text-genres">{genres}</p>
                </div>
                <div className="card-text">
                    <p className="card-text-overview">{setDescription()}</p>
                </div>
                <div className="card-buttons">
                    <button
                        className="button-trailer"
                        onClick={getVideo}
                    >
                        Ver Trailer
                    </button>
                    <button
                        className={(marked === undefined) ? "button-favorite" : "marked"}
                        onClick={addingFavorite}
                    >
                        {(marked === undefined)
                            ?
                            "Agregar a favoritos"
                            :
                            "Agregado a favoritos"
                        }
                        <img src={(marked === undefined) ? favorite : favoriteMarked} alt="favorite" className="favIcon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem;