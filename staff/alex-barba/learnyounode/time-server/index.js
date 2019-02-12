var net = require('net') 

const {argv: [,, port] } = process

var server = net.createServer(socket => {  
    var date = new Date()
    var year = date.getFullYear()  
    var month = date.getMonth().toString().length === 1 ? `0${date.getMonth()+1}` : date.getMonth()+1   
    var day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate()   
    var hour = date.getHours().toString().length === 1 ?  `0${date.getHours()}` : date.getHours()   
    var min = date.getMinutes().toString().length === 1 ?  `0${date.getMinutes()}` : date.getMinutes()   
    data = `${year}-${month}-${day} ${hour}:${min}`
    socket.end(`${data}\n`)
})  
server.listen(port) 