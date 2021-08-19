import axios from 'axios';
import { GET_GENRES } from '../fetch/urls';

export const getGenres = async (genres = []) => {
    const response = await axios.get(GET_GENRES);
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

export const genresList = async () => {
    const response = await axios.get(GET_GENRES);

    return await response.data.genres;
}