module.exports = {

    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    searchArtists: require('./search-artists'),

    retrieveArtist: require('./retrieve-artist'),

    addCommentToArtist: require('./add-comment-to-artist'),

    listCommentsFromArtist: require('./list-comments-from-artist'),

    toggleFavoriteArtist: require('./toggle-favorite-artist'),
   
    retrieveAlbums: require('./retrieve-albums'),

    retrieveAlbum: require('./retrieve-album'),
    
    retrieveTracks: require('./retrieve-tracks'),
    
    retrieveTrack: require('./retrieve-track'),

    toggleFavoriteAlbum: require('./toggle-favorite-album'),

    toggleFavoriteTrack: require('./toggle-favorite-track'),

    notFound: require('./not-found'),
}
