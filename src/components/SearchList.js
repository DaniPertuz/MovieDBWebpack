import React, { useEffect, useState } from 'react';
import SearchItem from './SearchItem';

export const SearchList = ({ results = [] }) => {
    return (
        <>
            {
                results.map((item, index) => (
                    <SearchItem
                        key={index}
                        {...item}
                    />
                ))
            }
        </>
    )
}
