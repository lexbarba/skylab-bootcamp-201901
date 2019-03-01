require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const cors = require('cors')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const { registerUser, authenticateUser, retrieveUser, searchArtists, updateUser, retrieveArtist, retrieveAlbums, addCommentToArtist, listCommentsFromArtist, toggleFavoriteArtist,retrieveAlbum, retrieveTrack, retrieveTracks ,notFound , deleteCommentFromArtist} = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, SECRET_JSON, CLIENT_ID, CLIENT_SECRET }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN
spotifyApi.clientId = CLIENT_ID
spotifyApi.clientSecret = CLIENT_SECRET

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() =>{
        spotifyApi.token = SPOTIFY_API_TOKEN
        tokenHelper.jwtSecret = SECRET_JSON

        const app = express()

        app.use(cors())

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get ('/user', tokenVerifierMiddleware,retrieveUser)

        router.post('/user/update', updateUser)

        router.post('/search/q=:query', searchArtists)

        router.get('/artist/:id', retrieveArtist)

        router.post('/artist/:id/comment', [jsonBodyParser, tokenVerifierMiddleware],addCommentToArtist)

        router.post('/artist/comment/:commentId', tokenVerifierMiddleware, deleteCommentFromArtist)

        router.get('/artist/:id/comment', tokenVerifierMiddleware,listCommentsFromArtist)

        router.post('/user/favoriteArtists', [jsonBodyParser, tokenVerifierMiddleware], toggleFavoriteArtist)

        router.get('/artist/:id/albums', retrieveAlbums)

        router.get('/album/:id', retrieveAlbum)

        router.get('/tracks/:id', retrieveTracks)

        router.get('/track/:id', retrieveTrack)

        router.get('*', notFound)

        // TODO remove

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))
        })
        .catch(({message}) => {
            console.error(message)
    
    process.on('SIGINT', () => {
        mongoose.disconnect()
            .then(() => {
                console.log('\nserver stopped')
                
                process.exit(0)
            })
    })
})