import React from 'react';
import SerieItem from './SerieItem';

const SeriesList = ({ series = [] }) => {
    return (
        <>
            {(series.length === 0)
                ?
                <h3 className="text-center">No hay series</h3>
                :
                series.map((item, index) => (
                    <SerieItem
                        key={index}
                        {...item}
                    />
                ))}
        </>
    )
}

export default SeriesList;