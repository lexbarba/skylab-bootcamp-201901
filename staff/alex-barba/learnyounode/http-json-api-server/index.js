var http = require('http')

const { argv : [,, port] } = process

http.createServer((req, res) => {
        const [path , query] = req.url.split('?')
    
        const [, ts] = query.split('=')

        let response
        
        const date = new Date(ts)
    
        if (path === '/api/unixtime') {
            response = { unixtime: date.getTime()}

        }else if ((path === '/api/parsetime') ) {
            response = {  
                "hour": date.getHours(),  
                "minute": date.getMinutes(),  
                "second": date.getSeconds()  
              }  
        }
        res.writeHead(200, { 'Content-Type': 'application/json' }) 
        res.end(JSON.stringify(response))

}).listen(port)