var http = require('http') 
var fs = require('fs')

var server = http.createServer((request, response) => {
    var src = fs.createReadStream(process.argv[3])
    src.pipe(dst)

}) 
server.listen(process.argv[2]) 





