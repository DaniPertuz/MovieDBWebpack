import React from 'react';
import FavoriteItem from './FavoriteItem';

const FavoritesList = ({ favorites = [] }) => {
    return (
        <>
            {
                favorites.map((item, index) => (
                    <FavoriteItem
                        key={index}
                        {...item}
                    />
                ))
            }
        </>
    )
}

export default FavoritesList;