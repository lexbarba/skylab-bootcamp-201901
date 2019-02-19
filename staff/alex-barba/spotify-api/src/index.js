require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')

const { register, authenticate, retrieve, notFound, searchArtists, retrieveArtist, retrieveAlbums, retrieveAlbum, retrieveTracks, retrieveTrack } = require('./routes')

const { env: { PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN

const app = express()

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.post('/user', jsonBodyParser, register.post)

router.post('/user/auth', jsonBodyParser, authenticate.post)

router.get('/user/:userId', retrieve.get)

router.get('/search', searchArtists.get)

router.get('/artists/:artistId', retrieveArtist.get)

router.get('/artists/:artistId/albums', retrieveAlbums.get)

router.get('/albums/:albumId', retrieveAlbum.get)

router.get('/albums/:albumId/tracks', retrieveTracks.get)

router.get('/tracks/:trackId', retrieveTrack.get)

app.use('/api', router)

// app.get('*', notFound.get)

app.listen(port, () => console.log(`server running on port ${port}`))