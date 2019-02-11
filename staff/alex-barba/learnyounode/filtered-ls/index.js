var fs = require('fs') 

var path = require('path')

fs.readdir(process.argv[2], (err, list) => {
    if (err) throw Error
    list.filter(word => path.extname(word) === `.${process.argv[3]}`).forEach(word => console.log(word))
})



