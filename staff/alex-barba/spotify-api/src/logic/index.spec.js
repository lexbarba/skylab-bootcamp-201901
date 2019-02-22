require('dotenv').config()
require('isomorphic-fetch')

const { MongoClient, ObjectId } = require('mongodb')
const expect = require('expect')
const spotifyApi = require('../spotify-api')
const artistComments = require('../data/artist-comments')
const logic = require('.')
const users = require('../data/users')
const jwt = require('jsonwebtoken')

const { env: { DB_URL, SPOTIFY_API_TOKEN, SECRET_JSON } } = process

spotifyApi.token = SPOTIFY_API_TOKEN

describe('logic', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client

                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() =>
        Promise.all([
            artistComments.removeAll(),
            users.collection.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')
                })
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
        it('should fail on object email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = {}
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on boolean email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = true
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on number email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 4
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on undefined email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = undefined
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on null email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = null
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on error email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = Error
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on function email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = function a() {}
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on empty email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = ''
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })
        it('should fail on object password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on boolean password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on number password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = 4

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on undefined password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on null password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = null

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on error password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = Error

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on date password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = Date

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('password cannot be empty'))
        })
        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = ''
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })
        it('should fail on non-matching passwords', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = '1234'

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('passwords do not match'))
        })
        it('should fail on empty passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('password confirmation cannot be empty'))
        })
        it('should fail on object passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
        it('should fail on boolean passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
        it('should fail on undefined passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
        it('should fail on null passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = null

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
        it('should fail on number passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = 4

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
        it('should fail on error passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = Error

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
        it('should fail on date passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = Date

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
        it('should fail on function passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = function a() {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm+ ' is not a string'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        let password
        
        beforeEach(() => {
            password = '123'
            email = `manuelbarzi@mail.com-${Math.random()}`
            return users.add({name, surname, email, password})
        })

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(({ id, token }) => {
                    expect(id).toBeDefined()
                    expect(token).toBeDefined()
                    expect(jwt.verify(token, SECRET_JSON)).toBeTruthy()
                })
        )
        it('should fail on empty email', function () {
            email = ''

            expect(() => logic.authenticateUser(email, password)).toThrowError('email cannot be empty')
        })
        it('should fail on array email', function () {
            email = []

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on boolean email', function () {
            const email = true

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on number email', function () {
            const email = 4

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on object email', function () {
            const email = {}

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on null email', function () {
            const email = null

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on undefined email', function () {
            const email = undefined

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on function email', function () {
            const email = function a() {}

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on date email', function () {
            const email = new Date

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on error email', function () {
            const email = Error

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })

        it('should fail on empty password', function () {
            password = ''

            expect(() => logic.authenticateUser(email, password)).toThrowError('password cannot be empty')
        })
        it('should fail on array password', function () {
            password = []

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on boolean password', function () {
            const password = true

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on number password', function () {
            const password = 4

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on object password', function () {
            const password = {}

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on null password', function () {
            const password = null

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on undefined password', function () {
            const password = undefined

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on function password', function () {
            const password = function a() {}

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on date password', function () {
            const password = new Date

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on error password', function () {
            const password = Error

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        let password
        let _id, _token

        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`
            password = '123'
            return users.add({name, surname, email, password})
                .then(() => users.findByEmail(email))
                .then(user => {
                    _id = user.id
                    _token = jwt.sign({
                        data: _id
                    }, SECRET_JSON, { expiresIn: '48h' })
                })
                .catch((err) => {
                    if (err) throw err
                })
            })

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(_id, _token)
                .then(user => {
                    expect(user.id).toEqual(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )
    })

    describe('update user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        let password
        let _id, _token

        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`
            password = '123'
            return users.add({name, surname, email, password})
                .then(() => users.findByEmail(email))
                .then((user) => {
                    _id = user.id
                    _token = jwt.sign({
                        data: _id
                    }, SECRET_JSON, { expiresIn: '48h' })
                })
                .catch((err) => {
                    if (err) throw err
                })
            })

        it('should succeed on correct credentials', () => {
            let data = {name: 'Manuel2'}
            return logic.updateUser(_id, _token, data)
                .then(() => users.findByUserId(_id))
                .then(user => {
                    expect(user.id).toEqual(_id)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
            })
        // TODO more unit test cases
    })

    describe('remove user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        let password
        let _id, _token

        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`
            password = '123'
            return users.add({name, surname, email, password})
                .then(() => users.findByEmail(email))
                .then((user) => {
                    _id = user.id
                    _token = jwt.sign({data: _id}, SECRET_JSON, { expiresIn: '48h' })
                })
                .catch((err) => {
                    if (err) throw err
                })
            })

        it('should succeed on correct credentials', () => {
            return logic.removeUser(_id, _token)
                .then(res => {
                    expect(res.deletedCount).toBe(1)
                })
                .then(() => users.findByUserId(_id))
                .then(user => {
                    expect(user).toBeNull()
                })
            })
        // TODO more unit test cases
    })

    // TODO updateUser and removeUser

    describe('search artists', () => {
        it('should succeed on matching query', () => {
            const query = 'madonna'

            return logic.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                    expect(artists instanceof Array).toBeTruthy()
                    expect(artists.length).toBeGreaterThan(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
        it('should fail on array query', function () {
            const query = []

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on boolean query', function () {
            const query = true

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on number query', function () {
            const query = 4

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on object query', function () {
            const query = {}

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on null query', function () {
            const query = null

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on undefined query', function () {
            const query = undefined

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on function query', function () {
            const query = function a() {}

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on date query', function () {
            const query = new Date

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on error query', function () {
            const query = Error

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
    })

    describe('retrieve artist', () => {
        const comment = {
            artistId : '6tbjWDEIzxoDsBA1FuhfPW',
            text: 'Such a cool song',
            date: new Date
        }
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        let password

        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`
            password = '123'
            return users.add({ name, surname, email, password })
                .then(() => users.findByEmail(email))
                .then(user => {
                    comment.userId = user.id.toString()
                    _id = user.id.toString()
                    _token = jwt.sign({
                        data: _id
                    }, SECRET_JSON, { expiresIn: '48h' })
                })
                .catch((err) => {
                    if (err) throw err
                })
                .then(() => {
                    artistComments.add(comment)
                })
        })

        it('should succeed on matching artistId', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW'

            return logic.retrieveArtist(artistId)
                .then(({id, name, comments}) => {
                    expect(id).toBe(artistId)
                    expect(name).toBe('Madonna')
                    expect(comments).toBeDefined()
                    expect(comments[0].text).toEqual(comment.text)
                })
        })

        it('should succeed on matching query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
            return logic.retrieveArtist(artistId)
                .then(({ id, name }) => {
                    expect(id).toBe(artistId)
                    expect(name).toBe('Madonna')
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => logic.retrieveArtist(artistId)).toThrowError('artistId is empty')
        })
        it('should fail on object artistId', function () {
            const artistId = {}

            expect(() => logic.retrieveArtist(artistId)).toThrow(Error(`${artistId} is not a string`))
        })
    })

    describe('toggle favorite artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'
        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        let _id, _token

        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`
            return users.add({name, surname, email, password})
                .then(() => users.findByEmail(email))
                .then((user) => {
                    _id = user.id
                    _token = jwt.sign({data: _id}, SECRET_JSON, { expiresIn: '48h' })
                })
                .catch((err) => {
                    if (err) throw err
                })
            })

        it('should succeed on correct data', () =>
            logic.toggleFavoriteArtist(_id, _token, artistId)
                .then(() => users.findByUserId(_id))
                .then(user => {
                    expect(user.id).toEqual(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteArtists).toBeDefined()
                    expect(user.favoriteArtists.length).toBe(1)
                    expect(user.favoriteArtists[0]).toBe(artistId)

                    return logic.toggleFavoriteArtist(_id, _token, artistId)
                })
                .then(() => users.findByUserId(_id))
                .then(user => {
                    expect(user.id).toEqual(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteArtists).toBeDefined()
                    expect(user.favoriteArtists.length).toBe(0)
                })
        )
        it('should fail object userId instead of string', () => {
            const userId = {}
            expect(() => logic.toggleFavoriteArtist(userId, _token, artistId)).toThrow(TypeError('userId should be a string'))
        })
        it('should fail object userId instead of string', () => {
            const token = {}
            expect(() => logic.toggleFavoriteArtist(_id, token, artistId)).toThrow(TypeError(`${token} is not a string`))
        })
        it('should fail object userId instead of string', () => {
            const artist_Id = {}
            expect(() => logic.toggleFavoriteArtist(_id, _token, artist_Id)).toThrow(TypeError('artistId should be a string'))
        })
    })

    describe('add comment to artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'
        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const comment = `comment ${Math.random()}`
        let _id, _token

        beforeEach(() =>{
            email = `manuelbarzi@mail.com-${Math.random()}`
            return users.add({name, surname, email, password})
                .then(() => users.findByEmail(email))
                .then(user => {
                    _id = user.id
                    _token = jwt.sign({data: _id}, SECRET_JSON, { expiresIn: '48h' })
                })
                .catch((err) => {
                    if (err) throw err
                })
        })
        
        it('should succeed on correct data', () =>
            logic.addCommentToArtist(_id, _token, artistId, comment)
                .then(id => {
                    expect(id).toBeDefined()

                    return artistComments.retrieve(id)
                        .then(_comment => {
                            expect(_comment.id).toBe(id)
                            expect(_comment.userId).toBe(_id)
                            expect(_comment.artistId).toBe(artistId)
                            expect(_comment.text).toBe(comment)
                        })
                })
        )
    })

    describe('list comments from artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const text = `comment ${Math.random()}`
        const text2 = `comment ${Math.random()}`
        const text3 = `comment ${Math.random()}`
        let comment, comment2, comment3
        let _id, _token

        beforeEach(() =>
            users.add({name, surname, email, password})
                .then(() => users.findByEmail(email))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
                .then(() => artistComments.add(comment = { userId: _id, artistId, text }))
                .then(() => artistComments.add(comment2 = { userId: _id, artistId, text: text2 }))
                .then(() => artistComments.add(comment3 = { userId: _id, artistId, text: text3 }))
        )

        it('should succeed on correct data', () =>
            logic.listCommentsFromArtist(artistId)
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(3)

                    comments.forEach(({ id, userId, artistId: _artistId, date }) => {
                        expect(id).toBeDefined()
                        expect(userId).toEqual(_id)
                        expect(_artistId).toEqual(artistId)
                        expect(date).toBeDefined()
                        expect(date instanceof Date).toBeTruthy()
                    })

                    expect(comments[0].text).toEqual(text)
                    expect(comments[1].text).toEqual(text2)
                    expect(comments[2].text).toEqual(text3)
                })
        )
    })

    describe('retrieve albums', () => {
        it('should succeed on matching query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return logic.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).toBeDefined()
                    expect(albums instanceof Array).toBeTruthy()
                    expect(albums.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => logic.retrieveAlbums(artistId)).toThrowError('artistId is empty')
        })
        it('should fail on array artistId', function () {
            const artistId = []

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on boolean artistId', function () {
            const artistId = true

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on number artistId', function () {
            const artistId = 4

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on object artistId', function () {
            const artistId = {}

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on null artistId', function () {
            const artistId = null

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on undefined artistId', function () {
            const artistId = undefined

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on function artistId', function () {
            const artistId = function a() {}

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on date artistId', function () {
            const artistId = new Date

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
        it('should fail on error artistId', function () {
            const artistId = Error

            expect(() => logic.retrieveAlbums(artistId)).toThrowError(`${artistId} is not a string`)
        })
    })

    describe('retrieve album', () => {
        it('should succeed on matching query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return logic.retrieveAlbum(albumId)
                .then(({ id, name }) => {
                    expect(id).toBe(albumId)
                    expect(name).toBe('Rebel Heart Tour (Live)')
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => logic.retrieveAlbum(albumId)).toThrowError('albumId is empty')
        })
        it('should fail on array albumId', function () {
            const albumId = []

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on boolean albumId', function () {
            const albumId = true

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on number albumId', function () {
            const albumId = 4

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on object albumId', function () {
            const albumId = {}

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on null albumId', function () {
            const albumId = null

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on undefined albumId', function () {
            const albumId = undefined

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on function albumId', function () {
            const albumId = function a() {}

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on date albumId', function () {
            const albumId = new Date

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
        it('should fail on error albumId', function () {
            const albumId = Error

            expect(() => logic.retrieveAlbum(albumId)).toThrowError(`${albumId} is not a string`)
        })
    })

    describe('toggle favorite album', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'
        const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)
        let _id, _token

        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`
            return users.add({name, surname, email, password})
                .then(() => users.findByEmail(email))
                .then((user) => {
                    _id = user.id
                    _token = jwt.sign({data: _id}, SECRET_JSON, { expiresIn: '48h' })
                })
                .catch((err) => {
                    if (err) throw err
                })
            })

        it('should succeed on correct data', () =>
            logic.toggleFavoriteAlbum(_id, _token, albumId)
                .then(() => users.findByUserId(_id))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteAlbums).toBeDefined()
                    expect(user.favoriteAlbums.length).toBe(1)
                    expect(user.favoriteAlbums[0]).toBe(albumId)

                    return logic.toggleFavoriteAlbum(_id, _token, albumId)
                })
                .then(() => users.findByUserId(_id))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteAlbums).toBeDefined()
                    expect(user.favoriteAlbums.length).toBe(0)
                })
        )
    })

    describe('retrieve tracks', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return logic.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).toBeDefined()
                    expect(tracks instanceof Array).toBeTruthy()
                    expect(tracks.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => logic.retrieveTracks(albumId)).toThrowError('albumId is empty')
        })
    })

    describe('retrieve track', () => {
        it('should succeed on mathing query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'

            return logic.retrieveTrack(trackId)
                .then(track => {
                    expect(track).toBeDefined()

                    const { id, name } = track

                    expect(id).toBe(trackId)
                    expect(name).toBe(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''

            expect(() => logic.retrieveTrack(trackId)).toThrowError('trackId is empty')
        })
    })

    describe('toggle favorite track', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live)
        let _id, _token

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.authenticateUser(email, password))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
        )

        it('should succeed on correct data', () =>
            logic.toggleFavoriteTrack(_id, _token, trackId)
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteTracks).toBeDefined()
                    expect(user.favoriteTracks.length).toBe(1)
                    expect(user.favoriteTracks[0]).toBe(trackId)

                    return logic.toggleFavoriteTrack(_id, _token, trackId)
                })
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteTracks).toBeDefined()
                    expect(user.favoriteTracks.length).toBe(0)
                })
        )
    })

    after(() =>
        Promise.all([
            artistComments.removeAll(),
            users.collection.deleteMany()
                .then(() => client.close())
        ])
    )
})