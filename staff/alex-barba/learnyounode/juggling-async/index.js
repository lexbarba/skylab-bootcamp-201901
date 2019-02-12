var http = require('http')
var concat = require('concat-stream')

const { argv: [,, ...urls] } = process

let contents = []
let count = 0

urls.forEach(url, index => {
    http.get(url, response => {
        response.pipe(concat(data => {
            contents[index] = data
            count++

            if(count === urls.length) contents.forEach(content => console.log(content))
        }))
    })
})

