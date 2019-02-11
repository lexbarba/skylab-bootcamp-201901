var concat = require('concat-stream')

var http = require('http')

http.get(process.argv[2], response => {
    response.pipe(concat( data => {
        console.log(data.toString().length)
        console.log(data.toString())
     })) 
})

