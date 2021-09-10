import React, { useState } from 'react';
import { searchItems } from '../helpers/search';
import { SearchList } from './SearchList';

export const Search = () => {

    const [totalResults, setTotalResults] = useState('');

    const [results, setResults] = useState([]);

    const getSearch = (e) => {
        const value = e.target.value;

        if (value !== '') {
            searchItems(value)
                .then((data) => {
                    setTotalResults(data.total_results);
                    setResults(data.results);
                });
        } else {
            setTotalResults('');
            setResults([]);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <input
                    type="search"
                    placeholder="Search for a movie, series and videos"
                    onChange={getSearch}
                />
            </div>
            {((results !== '') && (totalResults))
                ?
                <SearchList searchedItems={results} />
                :
                <></>
            }
        </>
    )
}
