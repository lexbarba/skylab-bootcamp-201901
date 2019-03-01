'use strict'

require('dotenv').config()

const spotifyApi = require('../spotify-api')
const {User, Comment} = require('../models')
const bcrypt = require('bcrypt') 

/**
 * Abstraction of business logic.
 */
const logic = {
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {

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


        return (async()=> {
            const user = await User.findOne({email})

            if (user) throw Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const response =  await User.create({ name, surname, email, password: hash })

            return response
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')
        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return (async() => {

            const user= await User.findOne({email})
            if (!user) throw Error(`user with email ${email} not found`)

            const match= await bcrypt.compare(password, user.password)
            if (!match) throw Error('wrong credentials')
           
            return user.id
        })()
    },
    
    /**
     * 
     * @param {*} userId 
     */
    retrieveUser(userId ) {

        if (typeof userId  !== 'string') throw TypeError(userId  + ' is not a string')
        if (!userId .trim().length) throw Error('userId  cannot be empty')

        return (async() => {
            const user = await User.findById(userId ).select('-__v -password').lean()
            if (!user) throw Error(`user with id ${userId } not found`)
            
            user.id= user._id.toString()
            delete user._id

            return user
        })()
    },
    /**
     * 
     * @param {*} userId  
     * @param {*} data 
     */
    updateUser(userId, data) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')    
        if (!data) throw Error('data should be defined')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return User.findByIdAndUpdate(userId, data)

    },
    /**
     * 
     * @param {*} userId 
     */
    removeUser(userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findOneAndRemove(userId)
    },


    /**
     * Search artists.
     * 
     * @param {string} query 
     * @returns {Promise}
     */
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return spotifyApi.searchArtists(query)
    },

    /**
     * Retrieves an artist.
     * 
     * @param {string} artistId 
     */
    retrieveArtist(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error('artistId is empty')

        return (async() => {
            const artist = await spotifyApi.retrieveArtist(artistId)
            const comments = await Comment.find({ targetId: artistId })
            artist.comments = comments
            return artist
        })()
    },

    /**
     * Toggles a artist from non-favorite to favorite, and viceversa.
     * 
     * @param {string} artistId - The id of the artist to toggle in favorites.
     */
    toggleFavoriteArtist(userId, artistId) {

        debugger

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`) 
        if (!userId.trim().length) throw Error('userId cannot be empty')
        if (typeof artistId !== 'string') throw TypeError(`artistId should be a string`)
        if (!artistId.trim().length) throw Error('artistId cannot be empty')  

        return(async() => {
            const user = await User.findById(userId)
            const { favoriteArtists = [] } = user
            const index = favoriteArtists.findIndex(_artistId => _artistId === artistId)

            if (index < 0) favoriteArtists.push(artistId)
            else favoriteArtists.splice(index, 1)

            user.favoriteArtists = favoriteArtists
            return User.updateOne(user)
        })()
    },

    /**
     * 
     * @param {*} userId 
     * @param {*} artistId 
     * @param {*} text 
     */
    addCommentToArtist(userId, artistId, text) {
         
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')
        if (typeof artistId !== 'string') throw TypeError(`artistId should be a string`)  
        if (!artistId.trim().length) throw Error('artistId cannot be empty')  
        if (typeof text !== 'string') throw TypeError(`text should be a string`)  
        if (!text.trim().length) throw Error('text cannot be empty')  

        const comment = {
            user: userId,
            targetId: artistId,
            target: 'artist',
            text,
        }

        return(async() =>{
            await User.findById(userId)
            const {id} = await Comment.create(comment)
            return id
        })()
    },

    /**
     * 
     * @param {*} userId 
     * @param {*} artistId 
     * @param {*} text 
     */
    deleteCommentFromArtist(commentId, userId) {

        debugger

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')
        if (typeof commentId !== 'string') throw TypeError(`commentId should be a string`)  
        if (!commentId.trim().length) throw Error('commentId cannot be empty')  

        return User.findById(userId)
            .then(() => Comment.findByIdAndRemove(commentId))
    },

    /**
     * 
     * @param {*} artistId 
     */
    listCommentsFromArtist(artistId) {

        // if (typeof artistId !== 'string') throw TypeError(`artistId should be a string`)  
        // if (!artistId.trim().length) throw Error('artistId cannot be empty')  

        return Comment.find({ targetId: artistId })
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId 
     */
    retrieveAlbums(artistId) {

        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveAlbums(artistId)
    },

    /**
     * Retrieves an album.
     * 
     * @param {string} albumId 
     */
    retrieveAlbum(albumId) {

        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)
        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveAlbum(albumId)
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId 
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)
        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)
    },

    /**
     * Retrieves track.
     * 
     * @param {string} trackId 
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)
        if (!trackId.trim().length) throw Error('trackId is empty')

        return spotifyApi.retrieveTrack(trackId)
    },

}

module.exports = logic