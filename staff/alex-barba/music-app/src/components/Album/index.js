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

    const handleDelete = (id) => {
        const { onCommentDelete} = props

        onCommentDelete(id)
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
        </div>
        <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
                <div class="field">
                    <label class="label">Add your comment</label>
                    <div class="control">
                        <textarea className="textarea is-small" placeholder="Add your comment!" onChange={e => setComment(e.target.value)}></textarea>
                    </div>
                </div>
                <div class="control">
                    <button className="button is-small is-white"  onClick={() => handleComment()}>Send</button>
                </div>
            </div>
        </div> 
        <section className="container has-text-centered">
            <h5 className="title is-5 margin-top">Comments</h5>
        </section>
        {   props.comments ?
            props.comments.map(comments => {
                return  <div className="comments columns margin-top">
                    <div className="column">
                        <article className="message" data-id={comments._id}>
                            <div className="message-header">
                                User: {comments.user}
                                { comments.user === props.userId ? <button className="delete" onClick={() => handleDelete(comments._id)}></button> : null}
                            </div>
                            <div className="message-body">
                                {comments.text}
                            </div>
                        </article>
                    </div>
                </div>
            }).reverse() : null
        }
    </section>
    )
}