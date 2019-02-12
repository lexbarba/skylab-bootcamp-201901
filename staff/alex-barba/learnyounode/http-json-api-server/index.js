var http = require('http')

const { argv : [,, port] } = process

http.createServer((req, res) => {
        const [path , query] = req.url.split('?')
    
        const [, ts] = query.split('=')
    
        if (path === '/api/unixtime') {
            const response = { unixtime: new Date(ts).getTime()}
            res.writeHead(200, { 'Content-Type': 'application/json' }) 
            res.end(JSON.stringify(response))

        }else if ((path === '/api/parsetime') ) {

            // const [, time] = ts.split('T')
            const response = {  
                "hour": new Date(ts).getHours(),  
                "minute": new Date(ts).getMinutes(),  
                "second": new Date(ts).getSeconds()  
              }  
            res.writeHead(200, { 'Content-Type': 'application/json' }) 
            res.end(JSON.stringify(response))
        } else {
            console.log('no hay nada más 1!')
        }

}).listen(port)