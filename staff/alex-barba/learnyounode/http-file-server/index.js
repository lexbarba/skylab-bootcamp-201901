var http = require('http') 
var fs = require('fs')

const { argv: [, , port, file] } = process

http.createServer((req, resp) => {

    resp.writeHead(200, {'content-type' : 'text/html'})
    const rs = fs.createReadStream(file)
    rs.pipe(resp)

}).listen(port) 





