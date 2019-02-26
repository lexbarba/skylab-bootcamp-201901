'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const users = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('user', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client
                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() => users.collection.deleteMany())

    describe('add', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct data', () =>
            users.add(_user)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')

                    return users.collection.findOne({ _id: ObjectId(id) })
                })
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
        it('should fail on undefined user', () => {
            const testUser = undefined
            expect(() => users.add(testUser)).to.throw(Error, 'user should be defined')
        })
        it('should fail on boolean user', () => {
            const testUser = true
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on string user', () => {
            const testUser = 'hi'
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on number user', () => {
            const testUser = 4
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on null user', () => {
            const testUser = null
            expect(() => users.add(testUser)).to.throw(Error, `user should be defined`)
        })
        it('should fail on date user', () => {
            const testUser = Date
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
        it('should fail on error user', () => {
            const testUser = Error
            expect(() => users.add(testUser)).to.throw(TypeError, `${testUser} should be an object`)
        })
    })
    describe('findByEmail', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        beforeEach(() => {
            users.collection.insertOne(_user)
        })

        it('should succeed on correct data', () => {
            return users.findByEmail(_user.email)
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.exist
                    expect(user.name).to.be.a('string')
                    expect(user.surname).to.exist
                    expect(user.surname).to.be.a('string')
                    expect(user.email).to.exist
                    expect(user.email).to.be.a('string')
                    expect(user.password).to.exist
                    expect(user.password).to.be.a('string')
                })
        })
        it('should fail on error email', () => {
            const testEmail = undefined
            expect(() => users.findByEmail(testEmail)).to.throw(Error, `email should be defined`)
        })
        it('should fail on null email', () => {
            const testEmail = null
            expect(() => users.findByEmail(testEmail)).to.throw(Error, `email should be defined`)
        })
        it('should fail on boolean email', () => {
            const testEmail = true
            expect(() => users.findByEmail(testEmail)).to.throw(TypeError, `${testEmail} should be a string`)
        })
        it('should fail on object email', () => {
            const testEmail = {}
            expect(() => users.findByEmail(testEmail)).to.throw(TypeError, `${testEmail} should be a string`)
        })
        it('should fail on number email', () => {
            const testEmail = 4
            expect(() => users.findByEmail(testEmail)).to.throw(TypeError, `${testEmail} should be a string`)
        })
        it('should fail on date email', () => {
            const testEmail = Date
            expect(() => users.findByEmail(testEmail)).to.throw(TypeError, `${testEmail} should be a string`)
        })
        it('should fail on error email', () => {
            const testEmail = Error
            expect(() => users.findByEmail(testEmail)).to.throw(TypeError, `${testEmail} should be a string`)
        })
    })
    describe('findByUserId', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }
        let userId

        beforeEach(() => {
            return users.collection.insertOne(_user)
                .then(res => userId = res.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            users.findByUserId(userId)
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.exist
                    expect(user.name).to.be.a('string')
                    expect(user.surname).to.exist
                    expect(user.surname).to.be.a('string')
                    expect(user.email).to.exist
                    expect(user.email).to.be.a('string')
                    expect(user.password).to.exist
                    expect(user.password).to.be.a('string')
                })
        )
        it('should fail on error userId', () => {
            const testId = undefined
            expect(() => users.findByUserId(testId)).to.throw(Error, `id should be defined`)
        })
        it('should fail on null userId', () => {
            const testId = null
            expect(() => users.findByUserId(testId)).to.throw(Error, `id should be defined`)
        })
        it('should fail on boolean userId', () => {
            const testId = true
            expect(() => users.findByUserId(testId)).to.throw(TypeError, `${testId} should be a string`)
        })
        it('should fail on object userId', () => {
            const testId = {}
            expect(() => users.findByUserId(testId)).to.throw(TypeError, `${testId} should be a string`)
        })
        it('should fail on number userId', () => {
            const testId = 4
            expect(() => users.findByUserId(testId)).to.throw(TypeError, `${testId} should be a string`)
        })
        it('should fail on date userId', () => {
            const testId = Date
            expect(() => users.findByUserId(testId)).to.throw(TypeError, `${testId} should be a string`)
        })
        it('should fail on error userId', () => {
            const testId = Error
            expect(() => users.findByUserId(testId)).to.throw(TypeError, `${testId} should be a string`)
        })
    })
    describe('update', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            password: 'meguhtalagasssolina'
        }
        let userId
        
        beforeEach(() => {
            _user.email = `Tachito-${Math.random()}`
            return users.collection.insertOne(_user)
            .then(res => userId = res.insertedId.toString())
        })
        
        it('should succeed with correct with one new data key', () => {
            const data = {name : 'testUsername'}
            return users.update(userId, data)
                .then(() => users.findByUserId(userId))
                    .then(user => {
                        expect(user).to.exist
                        expect(user.name).to.exist
                        expect(user.name).to.be.a('string')
                        expect(user.name).to.equal(data.name)
                        expect(user.surname).to.exist
                        expect(user.surname).to.be.a('string')
                        expect(user.email).to.exist
                        expect(user.email).to.be.a('string')
                        expect(user.password).to.exist
                        expect(user.password).to.be.a('string')
                    })
        })
        it('should succeed with more than one new data key', () => {
            const data = {name: 'testUsername', surname: 'newSurname'}
            return users.update(userId, data)
                .then(() => users.findByUserId(userId))
                    .then(user => {
                        expect(user).to.exist
                        expect(user.name).to.exist
                        expect(user.name).to.be.a('string')
                        expect(user.name).to.equal(data.name)
                        expect(user.surname).to.exist
                        expect(user.surname).to.be.a('string')
                        expect(user.surname).to.equal(data.surname)
                        expect(user.email).to.exist
                        expect(user.email).to.be.a('string')
                        expect(user.password).to.exist
                        expect(user.password).to.be.a('string')
                    })
        })
        it('should succeed adding new data key', () => {
            const data = {name: 'testUsername', surname: 'newSurname', car: 'Smart'}
            return users.update(userId, data)
                .then(() => users.findByUserId(userId))
                    .then(user => {
                        expect(user).to.exist
                        expect(user.name).to.exist
                        expect(user.name).to.be.a('string')
                        expect(user.name).to.equal(data.name)
                        expect(user.surname).to.exist
                        expect(user.surname).to.be.a('string')
                        expect(user.surname).to.equal(data.surname)
                        expect(user.email).to.exist
                        expect(user.email).to.be.a('string')
                        expect(user.password).to.exist
                        expect(user.password).to.be.a('string')
                        expect(user.car).to.exist
                        expect(user.car).to.be.a('string')
                        expect(user.car).to.equal(data.car)
                    })
        })
    })
    describe('remove', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            password: 'meguhtalagasssolina'
        }
        let userId

        beforeEach(() => {
            _user.email = `Tachito-${Math.random()}`
            return users.collection.insertOne(_user)
                .then(res => userId = res.insertedId.toString())
        })
        it('should succeed with correct id', () => {
            return users.remove(userId)
                .then(res => {
                    expect(res.deletedCount).to.equal(1)
                    return users.collection.findOne({_id: ObjectId(userId)   })
                })
                .then(res => expect(res).to.be.null)                
        })
        it('should fail with wrong id', () => {
            const userId = '5c6fd1ec978e082628684c69'
            return users.remove(userId)
                .then(res => {
                    expect(res.deletedCount).to.equal(0)
                })
        })
    })
    

    after(() =>
        users.collection.deleteMany()
            .then(() => client.close())
    )
})