import React, {useState} from 'react';

export default function Album (props) {

    const [comment, setComment] = useState(null)

    const handleComment = () => {
        const {onComment} = props

        onComment(comment)
    }

    const handleAlbumChosen = id => {
        const {onAlbum, feedback} = props

        onAlbum(id, feedback)
    }

    const handleBackToArtists = () => {
        const { onToArtists} = props

        onToArtists()
    }
    return (
    <section className="resultsAlbum container margin-top">
        <div className="level is-mobile">
            <h4 className="level-item">Albums</h4>
            <div className="level-item">
                <button onClick={handleBackToArtists}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;Back to Artists</button>
            </div>
        </div>
        <div className="albums columns is-mobile is-multiline is-centered">

        {
        props.albums.map(({ id, name, images, release_date, total_tracks }) =>{
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            return <div onClick={() => handleAlbumChosen(id)} data-id={id} className="cursor column card is-one-third-widescreen is-two-fifths-tablet is-three-quarters-mobile is-centered">
            <div className="hover card-image">
                <figure className="image is-centered">
                    <img src={image} />
                </figure>
            </div>
            <div className="card-content is-centered">
                <h4 className="title is-4">{name}</h4>
                <h5 className="subtitle is-6">Tracks :{total_tracks} </h5>
            </div>
            <div className="card-footer">
                <p className="subtitle is-6">Released date: {release_date}</p>
            </div>
        </div>
        })
        }
        <div className="comments columns is-mobile is-centered">
        {   props.comments ?
            props.comments.map(comments => {
                return <div className="column cursor card is-three-quarters-mobile has-text-centered">
                    <div className="card-content is-centered">
                        <p className="title is-4">{comments.text}</p>
                        <p className="subtitle is-6">User: {comments.userId}</p>
                    </div>
                </div>
            }) : null
        }
        </div>
        <div className="comments columns is-mobile is-centered">
            <div className="column cursor card is-three-quarters-mobile has-text-centered">
                <div className="card-content is-centered">
                    <textarea className="title is-4" placeholder="Add your comment!" onChange={e => setComment(e.target.value)}></textarea>
                    <button className="button is-large is-white"  onClick={() => handleComment()}>Send</button>
                </div>
            </div>
        </div>
        </div>     
    </section>
    )
}