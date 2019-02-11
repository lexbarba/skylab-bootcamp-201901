var http = require('http')
var concat = require('concat-stream')

http.get(process.argv[2], response => {
    response.pipe(concat(data => {
        console.log(data.toString())
        http.get(process.argv[3], response => {
            response.pipe(concat(data => {
                console.log(data.toString())
                http.get(process.argv[4], response => {
                    response.pipe(concat(data => {
                        console.log(data.toString())
                    }))
                    }) 
            }))
            })
    }))
})