'use strict'

/**
 * Database API client.
 * 
 * @version 1.0.0
 */

 const musicApi = {

    /**
     * 
     * Registers a new user.
     * 
     * @param {*} name 
     * @param {*} surname 
     * @param {*} email 
     * @param {*} password 
     */
    
    register(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('passwordConfirm is empty')

        if (password !== passwordConfirm) throw Error('passwords do not match')

        return fetch('http://localhost:8000/api/user', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error (response.error)
                else return response.id
            })
    },

    /**
     * 
     * Authenticates a user.
     * 
     * @param {*} email 
     * @param {*} password 
     */

    authenticate(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('http://localhost:8000/api/user/auth', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error (response.error)
                return response
            })
    },

    /**
     * 
     * Retrieves user information.
     * 
     * @param {*} id 
     * @param {*} token 
     */

    retrieve(id, token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`http://localhost:8000/api/user/${id}`, { 
            method: 'GET', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.email) return response
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Updates user information.
     * 
     * @param {*} id 
     * @param {*} token 
     * @param {*} object 
     */

    update(id, token, object) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (Object.entries(object).length === 0) throw Error(`${object} is empty`)

        return fetch(`http://localhost:8000/api/user/${id}/update`, { 
            method: 'POST', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ object }),
        })
            .then(response => response.json())
            .then(response => {
                if (response) return response
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Removes user.
     * 
     * @param {*} id 
     * @param {*} token 
     * @param {*} email 
     * @param {*} password 
     */

    remove(id, token, email, password) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, { 
            method: 'DELETE', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: email, password }),
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return true
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Updates user information.
     * 
     * @param {*} id 
     * @param {*} token 
     * @param {*} object 
     */

    toggleFavoriteArtist(userId, token, artistId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`http://localhost:8000/api/user/favoriteArtists`, { 
            method: 'POST', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userId, artistId }),
        })
            .then(response => response.json())
            .then(response => {
                if (response) return response
                else throw Error(response.error)
            })
    },

    /**
     * Searches artists.
     * 
     * @param {string} query - The text to match on artists search.
     * @retuns {Promise} - Resolves with artists, otherwise rejects with error.
     */
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return fetch(`http://localhost:8000/api/search/q=${query}`, {
            method: 'POST', 
        })
            .then(response => response.json())
            .then(response => {
                if(!response.length) throw Error('No artists matching your query!')
                
                return response
            })
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId - The artist to retrieve albums from.
     * @returns {Promise} - Resolves with albums, otherwise rejects with error.
     * 
     * @throws {TypeError} - On worng parameter type.
     * @throws {Error} - On empty parameter value.
     */
    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return fetch(`http://localhost:8000/api/artist/${artistId}/albums`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => response)
    },

        /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId - The album to retrieve tracks from.
     * @preturns {Promise} - Resolves with tracks, otherwise rejects with error.
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return fetch(`http://localhost:8000/api/tracks/${albumId}`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => response)
    },

    /**
     * Retrieves track.
     * 
     * @param {string} trackId - The id of the track to be retrieved.
     * @returns {Promise} Resolves with track, otherwise rejects with error.
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return fetch(`http://localhost:8000/api/track/${trackId}`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => response)
    },

    /**
     * 
     * Adds comment to Artist.
     * 
     * @param {*} id 
     * @param {*} token 
     * @param {*} object 
     */

    addCommentToArtist(userId, token, artistId, text) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error('artistId is empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text is empty')

        return fetch(`http://localhost:8000/api/artist/${artistId}/comment`, { 
            method: 'POST', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userId, text }),
        })
            .then(response => response.json())
            .then(response => {
                if (response) return response
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Lists comments to Artist.
     * 
     * @param {*} id 
     * @param {*} token 
     * @param {*} object 
     */

    listCommentsFromArtist(token, artistId) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error('artistId is empty')

        return fetch(`http://localhost:8000/api/artist/${artistId}/comment`, { 
            method: 'GET', 
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response) return response
                else throw Error(response.error)
            })
    },

}

export default musicApi