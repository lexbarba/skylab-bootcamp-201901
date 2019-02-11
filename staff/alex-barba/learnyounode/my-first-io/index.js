var fs = require('fs') 

var file = fs.readFileSync(process.argv[2], 'utf8')

// var lines = buffer.toString().split('\n').length-1

var lines = file.match(/\n/g).length

console.log(lines)