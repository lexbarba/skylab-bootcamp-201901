import React from 'react'

export default function Artist(props) {

    const handleArtist = (id) => {

        const { onArtist } = props

        onArtist(id)
    }

    const handleFavorite = (id) => {

        const { onToggleFavorite } = props

        onToggleFavorite(id)
    }

    return (
        <section className="resultsArtist container margin-top">
            <div className="columns is-mobile is-multiline is-centered">

                {
                    props.artists.map(({ id, name, images, popularity, genres, isFavorite }) => {
                        const genre = genres[0] ? genres[0] : 'No genre defined'
                        const image = images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
                        const heart = isFavorite ? <img className="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" />: <img className="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" />

                        return <div key={id} data-id={id} className="column cursor card is-one-third-widescreen is-two-fifths-tablet is-three-quarters-mobile has-text-centered">
                            <div className="hover card-image">
                                <figure className="image is-centered">
                                    <img onClick={() => handleArtist(id)} src={image} />
                                </figure>
                            </div>
                            <div className="card-content is-centered">
                                <h4 className="title is-4">{name}</h4>
                                <button className="button is-large is-white"  onClick={() => handleFavorite(id)}>{heart}</button>
                                <h5 className="subtitle is-6">Popularity Index :#{popularity}</h5>
                            </div>
                            <div className="card-footer">
                                <p className="subtitle is-6">Genre: {genre}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}