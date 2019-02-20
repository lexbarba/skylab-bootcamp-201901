module.exports = {
    registerUser: {
        post: require('./register-user')
    },

    authenticateUser: {
        post: require('./authenticate-user')
    },

    retrieveUser: {
        get: require('./retrieve-user')
    },

    searchArtists: {
        get: require('./search-artists')
    },

    retrieveArtist: {
        get: require('./retrieve-artist')
    },

    retrieveAlbums: {
        get: require('./retrieve-albums')
    },

    retrieveAlbum: {
        get: require('./retrieve-album')
    },

    retrieveTracks: {
        get: require('./retrieve-tracks')
    },

    retrieveTrack: {
        get: require('./retrieve-track')
    },

    // notFound: {
    //     get: require('./not-found')
    // }
}