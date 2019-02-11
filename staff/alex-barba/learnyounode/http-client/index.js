var http = require('http')

http.get(process.argv[2], response => {
    response.setEncoding('utf8').on("data", data => console.log(data)) 
})