const fs = require('./fs')

function numOfBreaks(data, callback) => {
    // if (typeof data !== 'string') return callback(`${data} is not a string`)
    // if (typeof callback !== 'function') return callback(`${callback} is not a function`)
    fs.readFile(data,'utf8', function callback(err, content){
        if (err) return callback(err)
        const result = content.match(/\n/g).length
        return callback(null, result)
    })
}

module.exports = numOfBreaks