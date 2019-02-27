import musicApi from '../music-api/index'

/**
 * logic.js of the Spotify App
 */

/* All fucntions declared inside a const to narrow the scope and prevent possible duplications. Sends and gets info from the API*/

const logic = {

    __userId__: null,
    __userApiToken__: null,

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */

    login: function (email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return musicApi.authenticate(email, password)
            .then(res => {
                this.__userId__ = res.id
                this.__userApiToken__= res.token
                return res
            })
    },

    /**
     * Registers a user.
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirmation  
     */

    register: function (name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return musicApi.register(name, surname, email, password, passwordConfirmation)
            .then(() => { })
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userId__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userId__ = null
        this.__userApiToken__ = null
    },
    
    retrieveUser() {
        return musicApi.retrieve(this.__userId__, this.__userApiToken__)
        .then(({ id, name, surname, email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
            id,
            name,
            surname,
            email,
            favoriteArtists,
            favoriteAlbums,
            favoriteTracks
        }))
    },

    // retrieveFavourites: function ( id, title, email, callback) {
    //     if (typeof email !== 'string') throw TypeError(email + ' is not a string')
    //     if (!email.trim().length) throw Error('email cannot be empty')

    //     if (typeof id !== 'string') throw TypeError(id + ' is not a string')
    //     if (!id.trim().length) throw Error('id cannot be empty')

    //     var user = users.find(function (user) {
    //         return user.email === email
    //     })
    //     console.log(user)

    //     if (!user) throw Error('user ' + email + ' not found')

    //     var exists = user.favourites.findIndex(obj => obj.id === id)
    //     let toSend = {id, title}

    //     if (exists !== -1) {
    //         user.favourites.splice(exists, 1)
    //         callback(user.favourites)   
    //         return false
    //     } else {
    //         user.favourites.push(toSend)
    //         callback(user.favourites)
    //         return true
    //     }
    // },

    /**
     * Search artists.
     * 
     * @param {string} query  
     */
    
    searchArtists(query) {
        if  (typeof query !== 'string') throw TypeError (`${query} is not a string`)
        
        if (query === undefined) throw Error (`No results for ${query}`)

        if (!query.trim().length) throw Error('query is empty')

        return musicApi.searchArtists(query)
    },

     /**
     * Search albums from the previous selected artist.
     * 
     * @param {string} artistId 
     */

    retrieveAlbums(artistId) {
        if  (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)
        
        if (!artistId.trim().length) throw Error('artist is empty')

        return musicApi.retrieveAlbums(artistId)
    },

     /**
     * Search tracks from the previous selected album.
     * 
     * @param {string} albumId 
     */

    retrieveTracks(albumId) {
        if  (typeof albumId !== 'string') throw TypeError (`${albumId} is not a string`)
        
        if (!albumId.trim().length) throw Error('album is empty')

        return musicApi.retrieveTracks(albumId)
    },

     /**
     * Search track from the previous selected list of tracks.
     * 
     * @param {string} trackId 
     */

    retrieveTrack(trackId) {
        if  (typeof trackId !== 'string') throw TypeError (`${trackId} is not a string`)
        
        if (!trackId.trim().length) throw Error('track is empty')

        return musicApi.retrieveTrack(trackId)
    },

    /**
     * Toggles a artist from non-favorite to favorite, and viceversa.
     * 
     * @param {string} artistId - The id of the artist to toggle in favorites.
     */
    toggleFavoriteArtist(artistId) {
        if  (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)       
        if (!artistId.trim().length) throw Error('artistId is empty')

        return musicApi.toggleFavoriteArtist(this.__userId__, this.__userApiToken__, artistId)
    },

    addCommentToArtist(artistId, text){
        if  (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)     
        if (!artistId.trim().length) throw Error('artistId is empty')

        if  (typeof text !== 'string') throw TypeError (`${text} is not a string`)  
        if (!text.trim().length) throw Error('text is empty')

        return musicApi.addCommentToArtist(this.__userId__, this.__userApiToken__, artistId, text)
    },

    listCommentsFromArtist(artistId){
        if  (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)  
        if (!artistId.trim().length) throw Error('artistId is empty')

        return musicApi.listCommentsFromArtist(this.__userApiToken__, artistId)
    },

    deleteCommentfromArtist(commentId){
        if  (typeof commentId !== 'string') throw TypeError (`${commentId} is not a string`)  
        if (!commentId.trim().length) throw Error('commentId is empty')

        return musicApi.deleteCommentsFromArtist(this.__userId__, this.__userApiToken__, commentId)
    }
}

export default logic;