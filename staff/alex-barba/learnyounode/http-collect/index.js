var concat = require('concat-stream')

var http = require('http')

const {argv :[,, url] }= process

http.get(url, res => {
    res.pipe(concat( data => {
        console.log(data.length)
        console.log(data)
     })) 
})

