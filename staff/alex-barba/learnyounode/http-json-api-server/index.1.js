const http = require('http')
const url = require('url')

const { argv : [,, port] } = process

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)

    const ts = parsedUrl.query.iso
    
    const date = new Date(ts)

    if (parsedUrl.pathname === '/api/unixtime') {
        response = { unixtime: date.getTime()}

    }else if ((parsedUrl.pathname === '/api/parsetime') ) {
        response = {  
            "hour": date.getHours(),  
            "minute": date.getMinutes(),  
            "second": date.getSeconds()  
            }  
    }
    res.writeHead(200, { 'Content-Type': 'application/json' }) 
    res.end(JSON.stringify(response))

}).listen(port)