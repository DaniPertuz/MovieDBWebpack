import React from 'react';

export const Labels = () => {
    return (
        <>
            <h4>Descubra nuevas películas y programas de televisión</h4>
            <div className="rowManual">
                <div className="column-2">
                    <label id="labelYear" className="labels" htmlFor="comboYear">
                        Año
                    </label>
                </div>
                <div className="column-2">
                    <label id="labelGender" className="labels" htmlFor="comboGenre">
                        Género
                    </label>
                </div>
            </div>
        </>
    )
}
