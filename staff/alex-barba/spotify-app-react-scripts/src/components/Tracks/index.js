import React from 'react';

export default function Tracks (props){
    
    const handleTrackChosen = id => {
        const{ onTrack, feedback} = props

        onTrack(id, feedback)
    }

    const handleBackToAlbums = () => {
        const {onToAlbums} = props

        onToAlbums()
    }

    return (
    <section className="tracksAlbum container margin-top">
        <div className="level is-mobile">
            <h4 className="level-item">Tracks</h4>
            <div className="level-item">
                <button onClick={handleBackToAlbums}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;Back to Albums</button>
            </div>
        </div>
        <ul className="content track has-text-centered">
        {
        props.tracks.map(({id, name}) => {
            return <li className="margin-top">
                <a onClick={() => handleTrackChosen(id)} data-id={id} className="button is-white">
                    <span className="panel-icon">
                        <i className="fas fa-music" aria-hidden="true"></i>
                    </span>
                    {name}
                </a>
            </li>       
        })
        }
        </ul>
    </section>
    )
}
