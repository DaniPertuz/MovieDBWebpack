import React from 'react';
import FavoriteItem from './FavoriteItem';

const FavoritesList = ({ favorites = [] }) => {
    return (
        <>
            {(favorites.length === 0)
                ?
                <h3 className="text-center">No hay items marcado como favoritos todavía</h3>
                :
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