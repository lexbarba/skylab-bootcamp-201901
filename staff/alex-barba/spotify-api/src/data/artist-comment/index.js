const uuid = require('uuid/v4')
const fsp = require('fs').promises // WARN need node v10+
const path = require('path')

const artistComment = {
    file: 'artist-comments.json',

    __load__(file) {
        return fsp.readFile(file)
            .then(content => JSON.parse(content))
    },

    __save__(file, comments) {
        return fsp.writeFile(file, JSON.stringify(comments, null, 4))
    },

    add(comment) {
        const { userId, artistId, text, date } = comment

        if (typeof userId !== 'string') throw TypeError (`${userId} is not a string`)
        if (!userId.trim().length) throw Error (`userId is empty`)
        if (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error (`artistId is empty`)
        if (typeof text !== 'string') throw TypeError (`${text} is not a string`)
        if (!text.trim().length) throw Error (`text is empty`)
        // if (!(date instanceof Date)) throw TypeError (`${date} is not a date`)
        // if (date === undefined) throw Error (`date is empty`)


        const file = path.join(__dirname, this.file)

        return this.__load__(file)
            .then(comments => {
                comment.id = uuid()
                comment.date = new Date

                comments.push(comment)

                return this.__save__(file, comments)
            })
    },

    retrieve(id) {
        if (typeof id !== 'string') throw TypeError (`${id} is not a string`)
        if (!id.trim().length) throw Error (`id is empty`)

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
        const { id, userId, artistId, text, date } = comment

        if (typeof id !== 'string') throw TypeError (`${id} is not a string`)
        if (!id.trim().length) throw Error (`id is empty`)
        if (typeof userId !== 'string') throw TypeError (`${userId} is not a string`)
        if (!userId.trim().length) throw Error (`userId is empty`)
        if (typeof artistId !== 'string') throw TypeError (`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error (`artistId is empty`)
        if (typeof text !== 'string') throw TypeError (`${text} is not a string`)
        if (!text.trim().length) throw Error (`text is empty`)
        if (!(date instanceof Date)) throw TypeError (`${date} is not a date`)
        if (date === undefined) throw Error (`date is empty`)

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
        if (typeof id !== 'string') throw TypeError (`${id} is not a string`)
        if (!id.trim().length) throw Error (`id is empty`)

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
        if (criteria.constructor !== Object) throw TypeError(`${criteria} is not an object`)
        if (!Object.keys(criteria).length) throw Error (`criteria is empty`)

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

module.exports = artistComment