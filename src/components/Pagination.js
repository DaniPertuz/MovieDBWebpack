import React from 'react';

const Pagination = ({ pages, nextPage, currentPage }) => {

    const pageLinks = [];

    for (let i = 1; i <= pages + 1; i++) {
        pageLinks.push(<li key={i} onClick={() => nextPage(i)}><a href="">{i}</a></li>);
    }

    return (
        <div className="container-pages">
            <ul className="pagination">
                {(currentPage > 1)
                    ?
                    <li className="pages" onClick={() => nextPage(currentPage - 1)}>Anterior</li>
                    :
                    <></>
                }

                {(currentPage < (pages + 1))
                    ?
                    <li className="pages" onClick={() => nextPage(currentPage + 1)}>Siguiente</li>
                    :
                    <></>
                }
            </ul>
        </div>
    )
}

export default Pagination;