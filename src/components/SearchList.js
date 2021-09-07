import React, { useEffect, useState } from 'react';
import SearchItem from './SearchItem';

export const SearchList = ({ results = [] }) => {
    return (
        <div className="items">
            {
                results.map((item, index) => (
                    <SearchItem
                        key={index}
                        {...item}
                    />
                ))
            }
        </div>
    )
}
