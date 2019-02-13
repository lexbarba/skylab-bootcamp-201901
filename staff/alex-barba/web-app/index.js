const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const { argv: [, , port = 8080] } = process

const formBodyParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.use(express.static('public'))

let feedback = ''

app.get('/register', (req, res) => {
    res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Register</h2>
        <form method="POST" action="/register">
        <input name="name" type="text" placeholder="name" required>
        <input name="surname" type="text" placeholder="surname" required>
        <input name="email" type="email" placeholder="email" required>
        <input name="password" type="password" placeholder="password" required>
        <input name= "passwordConfirm" type="password" placeholder= "passwordConfirm" required>
        <button type="submit">Register</button>
        </form>
        ${feedback? `<section class="feedback feecdack-warn">${feedback}</section>` : ''}
    </section>
</body>
</html>`)
})


app.post('/register', formBodyParser,(req, res) => {
    const { body : { name, surname, email, password, passwordConfirm } } = req

    try {
        logic.register(name, surname, email, password, passwordConfirm)
            .then(() => res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Registration confirmation</h2>
        User <strong>${email}</strong> has been successfully registered! Please proceed to <a href="/login">Log in</a>.
        </form>
    </section>
</body>
</html>`))
            .catch((error) => {
                feedback = error
                res.redirect('/register')
            })
    } catch (error) {
        feedback = error
        res.redirect('/register')
    }

})

app.get('/login', (req, res) => {
    res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="login">
        <h2>Log in</h2>
        <form method="POST" action="/login">
        <input name="email" type="email" placeholder="email" required>
        <input name="password" type="password" placeholder="password" required>
        <button type="submit">Log in</button>
        </form>
        ${feedback? `<section class="feedback feecdack-warn">${feedback}</section>` : ''}
    </section>
</body>
</html>`)
})

app.post('/login', formBodyParser,(req, res) => {
    const { body : { email, password } } = req

    try {
        logic.login(email, password)
            .then(() => res.redirect('/home'))
            .catch(({ message }) => {
                feedback = message
                res.redirect('/login')
            })
    } catch ({messdage}) {
        feedback = message
        res.redirect('/login')
    }

})

app.get('/home', (req, res) => {
    logic.userLoggedIn ? goHome() : res.redirect('/login')
    
    function goHome() {
        logic.retrieveUser() 
        .then( ({name}) => {
            res.send(`<html>
        <head>
            <title>HELLO WORLD</title>
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>
        <body>
            <h1>HELLO WORLD</h1>
            <section class="home">
                <h2>Home</h2>
                <p>Welcome ${name} to your home!</p>
            </section>
        </body>
        </html>`)
            
    })
}
})


app.listen(port, () => console.log(`server running on port ${port}`))
