import axios from 'axios';
import { GET_GENRES_MOVIES, GET_GENRES_SERIES } from '../fetch/urls';

export const getGenresMovies = async (genres = []) => {
    const response = await axios.get(GET_GENRES_MOVIES);
    const body = await response.data.genres;
    let genders = [];

    for (let i = 0; i < genres.length; i++) {
        const id = genres[i];
        for (let j = 0; j < body.length; j++) {
            const idGender = body[j].id;
            if (id === idGender) {
                genders.push(body[j].name);
            }
        }
    }

    return genders.join(', ');
}

export const getGenresSeries = async (genres = []) => {
    const response = await axios.get(GET_GENRES_SERIES);
    const body = await response.data.genres;
    let genders = [];

    for (let i = 0; i < genres.length; i++) {
        const id = genres[i];
        for (let j = 0; j < body.length; j++) {
            const idGender = body[j].id;
            if (id === idGender) {
                genders.push(body[j].name);
            }
        }
    }

    return genders.join(', ');
}

export const settingGenresList = async (allGenres = []) => {
    allGenres.sort();
    const uniqueGenres = allGenres.filter((v, i, a) => a.indexOf(v) === i);

    const response = await axios.get(GET_GENRES_MOVIES);
    const movies = await response.data.genres;

    const resp = await axios.get(GET_GENRES_SERIES);
    const series = await resp.data.genres;

    let genders = [], allGenresList = [];

    for (let i = 0; i < uniqueGenres.length; i++) {
        const item = uniqueGenres[i];
        for (let i = 0; i < item.length; i++) {
            const element = item[i];
            allGenresList.push(element);
        }
    }

    for (const genre of allGenresList) {
        for (const movie of movies) {
            const idGender = movie.id;
            if (genre === idGender) {
                genders.push(movie);
            }
        }
        for (let k = 0; k < series.length; k++) {
            const idGender = series[k].id;
            if (genre === idGender) {
                genders.push(series[k]);
            }
        }
    }

    genders.sort((firstGenre, secondGenre) => { return (firstGenre.name > secondGenre.name) ? 1 : (firstGenre.name < secondGenre.name) ? -1 : 0 });

    const uniques = genders.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

    return uniques;
}

export const genresList = async (allGenres = []) => {
    allGenres.sort();
    const uniqueGenres = allGenres.filter((v, i, a) => a.indexOf(v) === i);

    const response = await axios.get(GET_GENRES_MOVIES);
    const movies = await response.data.genres;

    const resp = await axios.get(GET_GENRES_SERIES);
    const series = await resp.data.genres;

    let genders = [], allGenresList = [];

    for (let i = 0; i < uniqueGenres.length; i++) {
        const item = uniqueGenres[i];
        for (let i = 0; i < item.length; i++) {
            const element = item[i];
            allGenresList.push(element);
        }
    }

    for (const genre of allGenresList) {
        for (const movie of movies) {
            const idGender = movie.id;
            if (genre === idGender) {
                genders.push(movie.name);
            }
        }
        for (let k = 0; k < series.length; k++) {
            const idGender = series[k].id;
            if (genre === idGender) {
                genders.push(series[k].name);
            }
        }
    }

    genders.sort();

    const uniques = genders.filter((v, i, a) => a.indexOf(v) === i);

    return uniques;
}