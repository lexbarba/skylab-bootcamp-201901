module.exports = {
    register: {
        post: require('./register/post')
    },

    authenticate: {
        post: require('./authenticate/post')
    },

    retrieve: {
        get: require('./retrieve/get')
    },

    searchArtists: {
        get: require('./searchArtists/get')
    },

    retrieveArtist: {
        get: require('./retrieveArtist/get')
    },

    retrieveAlbums: {
        get: require('./retrieveAlbums/get')
    },

    retrieveAlbum: {
        get: require('./retrieveAlbum/get')
    },

    retrieveTracks: {
        get: require('./retrieveTracks/get')
    },

    retrieveTrack: {
        get: require('./retrieveTrack/get')
    },

    // notFound: {
    //     get: require('./not-found/get')
    // }
}