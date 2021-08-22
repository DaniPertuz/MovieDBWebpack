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
                    type="text"
                    placeholder="Buscar película, serie o video"
                    onChange={getSearch}
                />
            </div>
            {
                totalResults &&
                <h6 className="results">{totalResults} coincidencias</h6>
            }

            {((results !== '') && (totalResults))
                ?
                <>
                    <SearchList searchedItems={results} />
                </>
                :
                <></>
            }
        </>
    )
}
