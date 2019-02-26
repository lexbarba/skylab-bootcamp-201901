import React from 'react';

export default function Feedback( {message} ) {

    return (
    <div className="columns is-mobile is-centered">
        <div className="column is-half is-centered button is-small is-inverted is-danger">
        {message}
        </div>
    </div>
    )
}