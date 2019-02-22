require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')

const { registerUser, authenticateUser, retrieveUser, searchArtists, updateUser, retrieveArtist, addCommentToArtist, listCommentsFromArtist, toggleFavoriteArtist, toggleFavoriteAlbum, toggleFavoriteTrack,retrieveAlbum, retrieveTrack, retrieveTracks ,notFound } = require('./routes')

const { env: { PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN

const app = express()

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user/:id', retrieveUser)

router.post('user/profile', updateUser)

router.get('/artists', searchArtists)

router.get('/artist/:id', retrieveArtist)

router.post('/artist/:id/comment', addCommentToArtist)

router.get('/artist/:id/comment', listCommentsFromArtist)

router.post('/artist/:id', toggleFavoriteArtist)

router.get('/artist/:id/albums', retrieveAlbums)

router.get('/album/:id', retrieveAlbum)

router.post('/album/:id', toggleFavoriteAlbum)

router.get('/tracks/:id', retrieveTracks)

router.get('/track/:id', retrieveTrack)

router.post('/track/:id', toggleFavoriteTrack)

app.get('*', notFound)


// TODO remove




app.use('/api', router)

app.listen(port, () => console.log(`server running on port ${port}`))