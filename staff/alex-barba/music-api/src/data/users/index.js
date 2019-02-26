'use strict'

const { ObjectId } = require('mongodb')

const users = {
    collection: null,

    add(user) {
        
        if (user === undefined || user === null) throw Error('user should be defined')
        if (user.constructor !== Object) throw TypeError(`${user} should be an object`)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    findByEmail(email) {

        if (email === undefined || email === null) throw Error('email should be defined')
        if (typeof email !== 'string') throw TypeError(`${email} should be a string`) 

        return this.collection.findOne({ email: email })
            .then(user => {
                if(!user) return null

                user.id = user._id.toString()
                
                delete user._id
                
                return user
            })
    },

    findByUserId(userId) {
        
        if (userId === undefined || userId === null) throw Error('id should be defined')
        if (typeof userId !== 'string') throw TypeError(`${userId} should be a string`)

        return this.collection.findOne({ _id: ObjectId(userId) })
            .then(user => {
                if(!user) return null

                user.id = user._id.toString()
                
                delete user._id

                return user
            })
    },

    update(user) {
        debugger
        const { id, ..._user } = user

        if (id === undefined || id === null) throw Error('id should be defined')
        if (typeof id !== 'string') throw TypeError(`${id} should be a string`)
        if (!_user) throw Error('data is not defined')
        if (_user.constructor !== Object) throw TypeError(`${_user} should be an object`)
        
        const filter = {_id: ObjectId(id)}

        return this.collection.findOneAndUpdate(filter, { $set: _user })
    },

    remove(userId) {

        if (userId === undefined || userId === null) throw Error('id should be defined')
        if (typeof userId !== 'string') throw TypeError(`${userId} should be a string`)

        return this.collection.deleteOne({_id: ObjectId(userId)})
    }
}

module.exports = users