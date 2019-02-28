require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const logic = require('./logic')
const cors = require('cors')

const { registerUser, authenticateUser, retrieveUser, searchArtists, updateUser, retrieveArtist, retrieveAlbums, addCommentToArtist, listCommentsFromArtist, toggleFavoriteArtist, toggleFavoriteAlbum, toggleFavoriteTrack,retrieveAlbum, retrieveTrack, retrieveTracks ,notFound , deleteCommentFromArtist} = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, SECRET_JSON, CLIENT_ID, CLIENT_SECRET }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN
spotifyApi.clientId = CLIENT_ID
spotifyApi.clientSecret = CLIENT_SECRET

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() =>{
        spotifyApi.token = SPOTIFY_API_TOKEN
        logic.jwtSecret = SECRET_JSON

        const app = express()

        app.use(cors())

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get ('/user/:id', retrieveUser)

        router.post('/user/:id/update', updateUser)

        router.post('/search/q=:query', searchArtists)

        router.get('/artist/:id', retrieveArtist)

        router.post('/artist/:id/comment', jsonBodyParser,addCommentToArtist)

        router.post('/artist/comment/:commentId', jsonBodyParser, deleteCommentFromArtist)

        router.get('/artist/:id/comment', listCommentsFromArtist)

        router.post('/user/favoriteArtists', jsonBodyParser, toggleFavoriteArtist)

        router.get('/artist/:id/albums', retrieveAlbums)

        router.get('/album/:id', retrieveAlbum)

        // router.post('/album/:id', toggleFavoriteAlbum)

        router.get('/tracks/:id', retrieveTracks)

        router.get('/track/:id', retrieveTrack)

        // router.post('/track/:id', toggleFavoriteTrack)

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