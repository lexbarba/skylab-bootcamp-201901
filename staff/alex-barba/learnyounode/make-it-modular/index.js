var mymodule = require('./module.js') 

mymodule(process.argv[2], process.argv[3], (err, data) => {
    if (err) console.log(err)
    data.forEach(word => console.log(word))

})