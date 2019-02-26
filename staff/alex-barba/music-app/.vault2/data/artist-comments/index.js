const uuid = require('uuid/v4')
const fsp = require('fs').promises // WARN need node v10+
const path = require('path')

const artistComments = {
    file: 'artist-comments.json',

    __load__(file) {
        return fsp.readFile(file)
            .then(content => JSON.parse(content))
    },

    __save__(file, comments) {
        return fsp.writeFile(file, JSON.stringify(comments, null, 4))
    },

    add(comment) {

        if (comment === undefined) throw Error('comment should be defined')
        if (comment.constructor !== Object) throw TypeError(`${comment} should be an object`)

        const file = path.join(__dirname, this.file)

        return this.__load__(file)
            .then(comments => {
                
                comment.id = uuid()
                comments.push(comment)

                return this.__save__(file, comments)
            })
    },

    retrieve(id) {
        if (id === undefined) throw Error('id should be defined')
        if (typeof id !== 'string') throw TypeError(`${id} should be a string`)

        const file = path.join(__dirname, this.file)

        return this.__load__(file)
            .then(comments => {
                const comment = comments.find(comment => comment.id === id)

                if (typeof comment === 'undefined') return null

                comment.date = new Date(comment.date)

                return comment
            })
    },

    update(comment) {
        
        if (comment === undefined) throw Error('comment should be defined')
        if (comment.constructor !== Object) throw TypeError(`${comment} should be an object`)

        const file = path.join(__dirname, this.file)

        return this.__load__(file)
            .then(comments => {
                const index = comments.findIndex(_comment => _comment.id === comment.id)

                if (index < 0) throw Error(`comment with id ${comment.id} not found`)

                comments[index] = comment

                return this.__save__(file, comments)
            })
    },

    remove(id) {

        if (id === undefined) throw Error('id should be defined')
        if (typeof id !== 'string') throw TypeError(`${id} should be a string`)

        const file = path.join(__dirname, this.file)

        return this.__load__(file)
            .then(comments => {
                const index = comments.findIndex(comment => comment.id === id)

                if (index < 0) throw Error(`comment with id ${id} not found`)

                comments.splice(index, 1)

                return this.__save__(file, comments)
            })
    },

    removeAll() {
        const file = path.join(__dirname, this.file)
        
        return this.__save__(file, [])
    },

    find(criteria) {

        if (criteria === undefined) throw Error('criteria should be defined')
        if (criteria.constructor !== Object) throw TypeError(`${criteria} should be an object`)

        const file = path.join(__dirname, this.file)

        return this.__load__(file)
            .then(comments => {
                
                const filtered = comments.filter(comment => {
                    for (const key in criteria)
                        if (comment[key] !== criteria[key]) return false

                    return true
                })
                filtered.forEach(comment => comment.date = new Date(comment.date))
                return filtered
            })
    }
}

module.exports = artistComments