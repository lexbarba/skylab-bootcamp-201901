module.exports = {
    register: {
        post: require('./register-user')
    },

    authenticate: {
        post: require('./authenticate-user')
    },

    retrieve: {
        get: require('./retrieve-user')
    },

    notFound: {
        get: require('./not-found')
    },

    searchArtists: {
        get: require('./search-artists')
    },

    retrieveAlbums: {
        get: require('./retrieve-albums')
    },

    retrieveTracks: {
        get: require('./retrieve-tracks')
    },

    retrieveTrack: {
        get: require('./retrieve-track')
    }
}