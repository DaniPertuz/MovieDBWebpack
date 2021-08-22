import React, { useEffect, useState } from 'react';
import FavoriteItem from './FavoriteItem';
import Item from './Item';

const Items = ({ items }) => {

    return (
        <div className="rowManual">
            {(items.favorites === false)
                ?
                items.shows.map((item, index) => (
                    <Item
                        key={index}
                        {...item}
                    />
                ))
                :
                items.shows.map((item, index) => (
                    <FavoriteItem
                        key={index}
                        {...item}
                    />
                ))
            }
        </div>
    )
}

export default Items;