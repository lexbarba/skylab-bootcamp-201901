const numOfBreaks = require('./numOfBreaks')

numOfBreaks(path, (err, data) =>{
    if (err) callback(err)
    callback(null, data)
})