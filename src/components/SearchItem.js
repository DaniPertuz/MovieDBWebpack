import React, { useEffect, useState } from 'react';
import { getGenres } from '../helpers/genres';
import Swal from 'sweetalert2';

import noPoster from '../assets/no-poster.jpeg';

const SearchItem = ({ poster_path, name, title, overview, vote_average, genre_ids, first_air_date, release_date, media_type, known_for }) => {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres(genre_ids)
            .then(data => setGenres(data));
    }, []);

    const addFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));

        const item = { poster_path, name, overview, vote_average, genre_ids, first_air_date };

        localStorage.setItem('favorites', JSON.stringify([...favorites, item]));
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

    const isVideo = () => {
        Swal.fire('Lo sentimos', 'No hay tráiler para esta serie', 'warning');
    }

    return (
        <div className="container-card">
            <div className="card">
                <img src={setImage()} alt={name} />

                {name &&
                    <h5 className="card-title">{name}</h5>
                }

                {title &&
                    <h5 className="card-title">{title}</h5>
                }

                <h5 className="card-subtitle">{setVoteAverage()}</h5>

                <p className="card-text">{setDate()}</p>

                <p className="card-text">{genres}</p>
                <p className="card-text">
                    {(media_type === 'tv')
                        ?
                        'Película'
                        :
                        'Serie'
                    }
                </p>
                <p className="card-text-overview">{setDescription()}</p>
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

export default SearchItem;