import React from 'react';
import SerieItem from './SerieItem';

const SeriesList = ({ series = [] }) => {
    return (
        <>
            {series.map((item, index) => (
                <SerieItem
                    key={index}
                    {...item}
                />
            ))}
        </>
    )
}

export default SeriesList;