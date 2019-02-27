import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import Header from '../Header'
import Login from '../Login'
import Search from '../Search'
import Artist from '../Artist'
import Album from '../Album'
import Tracks from '../Tracks'
import Track from '../Track'
import Favourite from '../Favourite'
import Register from '../Register'

class App extends Component {

    state = { loginFeedback: null, registrationFeedback: null, searchFeedback: null, artistId: null, albumId: null, trackId: null, modal: false, favouritesVisible: false, user: null, userId: null ,userEmail: null, query: null, artists: [], albums: [], tracks: [], track: {}, comments:[] }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password)
                .then(() => logic.retrieveUser())
                .then(user => { this.setState({ user: user.name, userEmail: user.email, userId: user.id}) })
                .then(() => this.setState({ loginFeedback: '' }))
                .then(() => this.props.history.push('/home'))
                .catch(({ message }) => this.setState({ loginFeedback: message }))
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    handleRegistration = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.register(name, surname, email, password, passwordConfirmation)
                .then(id => this.setState({ modal: true }))
                .catch(({ message }) => this.setState({ registrationFeedback: message }))
        } catch ({ message }) {
            this.setState({ registrationFeedback: message })
        }
    }

    handleSearch = query => {
        this.setState({ searchFeedback: '' })
        try {
            Promise.all([
                logic.searchArtists(query),
                logic.retrieveUser()
            ])
                .then(([artists, { favoriteArtists }]) => {
                    this.setState({
                        artists: artists.map(({ id, name, images, popularity, genres }) => ({ id, name, images, popularity, genres, isFavorite: favoriteArtists.includes(id) }))
                    })
                })

                .then(() => this.setState({ query }, () => this.props.history.push(`/home/search/${query}`)))
                .catch(({ message }) => this.setState({ searchFeedback: message }))
        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleToggleFavorite = artistId => {
        try {
            logic.toggleFavoriteArtist(artistId)
                .then(() => {
                    const { state: { query } } = this

                    return this.handleSearch(query)
                })
                .catch(({ message }) => this.setState({ searchFeedback: message }))
        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleAlbum = (artistId) => {
        this.setState({ searchFeedback: '' })
        try {
            
            logic.retrieveAlbums(artistId)
                .then(albums => this.setState({ albums }))
                .then(() => this.setState({ artistId }))
                .then(() =>  logic.listCommentsFromArtist(artistId))
                .then(comments => {
                    debugger
                    this.setState({comments})
                })
                .then(() => this.props.history.push(`/home/artist/${artistId}`))
                .catch(({ message }) => this.setState({ searchFeedback: message }))
        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleTracks = (albumId) => {
        this.setState({ searchFeedback: '' })
        try {
            logic.retrieveTracks(albumId)
                .then(tracks => this.setState({ tracks }))
                .then(() => this.setState({ albumId }, () => this.props.history.push(`/home/album/${albumId}`)))
                .catch(({ message }) => this.setState({ searchFeedback: message }))
        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleTrack = (trackId) => {
        this.setState({ searchFeedback: '' })
        try {
            logic.retrieveTrack(trackId)
                .then(track => this.setState({ track }))
                .then(() => this.setState({ trackId }, () => this.props.history.push(`/home/track/${trackId}`)))
                .catch(({ message }) => this.setState({ searchFeedback: message }))
        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleToLogout = () => {
        this.setState({ query: '', loginFeedback: '', registrationFeedback: '', user: '', userEmail: '', userFavourites: '' })
        this.props.history.push('/home')
    }

    handleToArtists = () => {
        const { state: { query } } = this
        this.props.history.push(`/home/search/${query}`)
    }

    handleToAlbums = () => {
        const { state: { artistId } } = this
        this.props.history.push(`/home/artist/${artistId}`)
    }

    handleToTracks = () => {
        const { state: { albumId } } = this
        this.props.history.push(`/home/album/${albumId}`)
    }

    handleLoginToRegister = () => {
        this.props.history.push('/register')
    }

    handleRegisterToLogin = () => {
        this.setState({ modal: false, registrationFeedback: null })
        this.props.history.push('/login')
    }

    handleToSearch = () => {
        this.setState({ query: null })
        this.props.history.push('/home')
    }

    handleOnComment = comment => {
        const { state: { artistId } } = this

        try {
            logic.addCommentToArtist(artistId, comment)
                .then(() => {
                    const { state: { artistId } } = this

                    return this.handleAlbum(artistId)
                })
                .catch(({ message }) => this.setState({ searchFeedback: message }))
        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }

    }

    // handleCommentDelete = id => {
    //     const { state: { artistId } } = this

    //     try {
    //         logic.addCommentToArtist(artistId, comment)
    //             .then(() => {
    //                 const { state: { artistId } } = this

    //                 return this.handleAlbum(artistId)
    //             })
    //             .catch(({ message }) => this.setState({ searchFeedback: message }))
    //     } catch ({ message }) {
    //         this.setState({ searchFeedback: message })
    //     }

    // }

    render() {
        const { state: { searchFeedback, loginFeedback, registrationFeedback, modal, artists, user, albums, tracks, track, comments, userId }, handleCommentDelete, handleOnComment, handleToggleFavorite, handleLogin, handleRegistration, handleLoginToRegister, handleSearch, handleAlbum, handleTracks, handleTrack, handleToLogout, handleToArtists, handleToAlbums, handleToTracks, handleCloseModal, handleFavourites, onFavourites, handleToSearch, handleRegisterToLogin } = this

        return <main>
            <Header path="/" render={() => <Header />} />
            <Route path="/home" render={() => <Search onToSearch={handleSearch} feedback={searchFeedback} user={user} onToLogout={handleToLogout} onToFavourites={onFavourites} />} />
            <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} feedback={loginFeedback} onToRegister={handleLoginToRegister} />} />
            <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onCommentDelete={handleCommentDelete}onRegistration={handleRegistration} feedback={registrationFeedback} onToLogin={handleRegisterToLogin} modal={modal} />} />
            <Route path="/home/search/:query" render={props => <Artist artists={artists} onArtist={handleAlbum} query={props.match.params.query} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/home/artist/:artistId" render={props => <Album onComment={handleOnComment} userId={userId} comments={comments} albums={albums} onAlbum={handleTracks} onToArtists={handleToArtists} artistId={props.match.params.artistId} />} />
            <Route path="/home/album/:albumId" render={props => <Tracks tracks={tracks} onTrack={handleTrack} onToAlbums={handleToAlbums} albumId={props.match.params.albumId} />} />
            <Route path="/home/track/:trackId" render={props => <Track track={track} onToTracks={handleToTracks} trackId={props.match.params.trackId} />} />

            {/* {loginVisible && <Login onLogin={handleLogin} feedback={loginFeedback} onToRegister={handleLoginToRegister} />}
            {registerVisible && <Register onRegistration={handleRegistration} feedback={registrationFeedback} onToLogin={handleRegisterToLogin} />}
            {searchVisible && <Search onToSearch={handleSearch} feedback={searchFeedback} user={user} onToLogout={handleToLogout} onToFavourites={onFavourites} />}
            {artistVisible && <Artist artists={artists} onArtist={handleAlbum} />}
            {albumVisible && <Album albums={albums} onAlbum={handleTracks} onToArtists={handleToArtists} />}
            {tracksVisible && <Tracks tracks={tracks} onTrack={handleTrack} onToAlbums={handleToAlbums} />}
            {trackVisible && <Track track={track} onToTracks={handleToTracks} onFavourite={handleFavourites} resultFavourite={resultFavourite} userFavourites={userFavourites} />}
            {modalVisible && <ModalRegistration closeModal={handleCloseModal} />}
            {favouritesVisible && <Favourite track={track} userFavourites={userFavourites} onToSearch={handleToSearch} onTrack={handleTrack} />} */}
        </main>

    }
}

export default withRouter(App)
