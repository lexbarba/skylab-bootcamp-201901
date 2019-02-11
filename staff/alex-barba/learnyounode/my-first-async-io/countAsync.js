module.exports = (data, callback) => {
    if (typeof data !== 'string') return callback(`${data} is not a string`)
    if (typeof callback !== 'function') return callback(`${callback} is not a function`)

    return callback(null, data.match(/\n/g).length)
}