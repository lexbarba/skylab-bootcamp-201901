require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')

const { registerUser, authenticateUser, retrieveUser, notFound, searchArtists, retrieveArtist, retrieveAlbums, retrieveAlbum, retrieveTracks, retrieveTrack } = require('./routes')

const { env: { PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN

const app = express()

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user/:userId', retrieveUser)

router.get('/search', searchArtists)

router.get('/artists/:artistId', retrieveArtist)

router.get('/artists/:artistId/albums', retrieveAlbums)

router.get('/albums/:albumId', retrieveAlbum)

router.get('/albums/:albumId/tracks', retrieveTracks)

router.get('/tracks/:trackId', retrieveTrack)

app.use('/api', router)

// app.get('*', notFound.get)

app.listen(port, () => console.log(`server running on port ${port}`))