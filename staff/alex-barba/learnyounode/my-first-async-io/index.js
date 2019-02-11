fs.readFile(process.argv[2],'utf8', function callback(err, data){
    if (err) throw Error
    console.log(data.march(/\n/g).length)
})