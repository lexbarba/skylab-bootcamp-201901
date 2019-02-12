var fs = require('fs') 
var path = require('path')

module.exports = function (directory, extension, callback) {
    fs.readdir(directory, (err, list) => {
        if (err) return callback(err)
        else {
            var results = list.filter(word => path.extname(word) === `.${extension}`)
            callback (null, results)
        }
    })
} 