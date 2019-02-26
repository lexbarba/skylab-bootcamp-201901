'use strict'

require('dotenv').config()

const spotifyApi = require('../spotify-api')
const users = require('../data/users')
const artistComments = require('../data/artist-comments')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 

const { env: { SECRET_JSON } } = process

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

        return users.findByEmail(email)
            .then(user => {
                if (user) throw Error(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => users.add({ name, surname, email, password: hash }))
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

        return users.findByEmail(email)
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)
                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('wrong credentials')
                        
                        const {id} = user
                        const secret = SECRET_JSON
                        const token = jwt.sign({data: id}, secret, { expiresIn: '48h' })
                        return { id, token }
                    })
            })
    },
    
    /**
     * 
     * @param {*} userId 
     * @param {*} token 
     */
    retrieveUser(userId, token) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')
        if (!token.trim().length) throw Error('token cannot be empty')

        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        return users.findByUserId(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)

                delete user.password

                return user
            })
    },
    /**
     * 
     * @param {*} userId 
     * @param {*} token 
     * @param {*} data 
     */
    updateUser(userId, token, data) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim().length) throw Error('token cannot be empty')
        
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error('data should be defined')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return users.update(userId, data)

    },
    /**
     * 
     * @param {*} userId 
     * @param {*} token 
     */
    removeUser(userId, token) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return users.remove(userId)
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

        return spotifyApi.retrieveArtist(artistId)
            .then(artist => {
                return artistComments.find({ artistId: artist.id })
                    .then(comments => {
                        artist.comments = comments
                    })
                    .then(() => artist)
            })
    },

    /**
     * Toggles a artist from non-favorite to favorite, and viceversa.
     * 
     * @param {string} artistId - The id of the artist to toggle in favorites.
     */
    toggleFavoriteArtist(userId, token, artistId) {

        //todo
        if (typeof userId !== 'string') throw TypeError(`userId should be a string`)
        
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        
        if (!token.trim().length) throw Error('token cannot be empty')
        
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        // if (typeof artistId !== 'string') throw TypeError(`artistId should be a string`)

        return users.findByUserId(userId)
            .then(user => {
                debugger
                const { favoriteArtists = [] } = user

                const index = favoriteArtists.findIndex(_artistId => _artistId === artistId)

                if (index < 0) favoriteArtists.push(artistId)
                else favoriteArtists.splice(index, 1)

                user.favoriteArtists = favoriteArtists
                debugger
                return users.update(user)
            })
    },

    /**
     * 
     * @param {*} userId 
     * @param {*} token 
     * @param {*} artistId 
     * @param {*} text 
     */
    addCommentToArtist(userId, token, artistId, text) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        
        if (!token.trim().length) throw Error('token cannot be empty')
        
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        const comment = {
            userId,
            artistId,
            text,
            date: new Date
        }

        return users.findByUserId(userId)
            .then(() => artistComments.add(comment))
            .then(() => comment.id)
    },

    /**
     * 
     * @param {*} artistId 
     */
    listCommentsFromArtist(artistId) {
        // TODO artistId

        return artistComments.find({ artistId })
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
     * Toggles a album from non-favorite to favorite, and viceversa.
     * 
     * @param {string} albumId - The id of the album to toggle in favorites.
     */
    toggleFavoriteAlbum(userId, token, albumId) {

        //todo
        if (typeof userId !== 'string') throw TypeError(`userId should be a string`)
        
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        
        if (!token.trim().length) throw Error('token cannot be empty')
        
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        if (typeof albumId !== 'string') throw TypeError(`albumId should be a string`)

        return users.findByUserId(userId)
            .then(user => {
                const { favoriteAlbums = [] } = user

                const index = favoriteAlbums.findIndex(_albumId => _albumId === albumId)

                if (index < 0) favoriteAlbums.push(albumId)
                else favoriteAlbums.splice(index, 1)

                user.favoriteAlbums = favoriteAlbums

                return users.update(user)
            })
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

    /**
     * Toggles a track from non-favorite to favorite, and viceversa.
     * 
     * @param {string} trackId - The id of the track to toggle in favorites.
     */
    toggleFavoriteTrack(userId, token, trackId) {

        //todo
        if (typeof userId !== 'string') throw TypeError(`userId should be a string`)
        
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        
        if (!token.trim().length) throw Error('token cannot be empty')
        
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        if (typeof trackId !== 'string') throw TypeError(`trackId should be a string`)

        return users.findByUserId(userId)
            .then(user => {
                const { favoriteTracks = [] } = user

                const index = favoriteTracks.findIndex(_trackId => _trackId === trackId)

                if (index < 0) favoriteTracks.push(trackId)
                else favoriteTracks.splice(index, 1)

                user.favoriteTracks = favoriteTracks

                return users.update(user)
            })
    }
}

module.exports = logic