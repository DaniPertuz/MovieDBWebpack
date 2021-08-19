import axios from 'axios';
import { GET_SEARCH } from '../fetch/urls';

export const searchItems = async (criteria) => {
    const resp = await axios.get(GET_SEARCH + criteria);
    const results = await resp.data;
    return results;
}