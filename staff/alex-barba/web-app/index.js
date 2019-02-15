require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const logicFactory = require('./src/logic-factory')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)

const { enc:{PORT}, argv: [, , port = PORT || 8080] } = process

const app = express()

app.set('view engine', 'pug')

app.use(session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: true,
    // store: new FileStore({
    //     path: './.sessions'
    // })
}))

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))

function pullFeedback(req) {
    const { session: { feedback } } = req

    req.session.feedback = null
    
    return feedback
}

function render(content) {
    return `<html>
    <head>
        <title>HELLO WORLD</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h1>HELLO WORLD</h1>
        ${content}
    </body>
</html>`
}

app.get('/', (req, res) => {
    res.send(render(`<section class="landing">
        <a href="/login">Login</a> or <a href="/register">Register</a>
    </section>`))
})

app.get('/register', (req, res) => {
    const feedback = pullFeedback(req)
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
    res.send(render((`<section class="register">
    <h2>Register</h2>
    <form method="POST" action="/register">
    <input name="name" type="text" placeholder="Name" required>
    <input name="surname" type="text" placeholder="Surname" required>
    <input name="email" type="email" placeholder="Email" required>
    <input name="password" type="password" placeholder="Password" required>
    <input name= "passwordConfirm" type="password" placeholder= "Confirm Password" required>
    <button type="submit">Register</button>
    </form>
    ${feedback ? `<section class="feedback feecdack-warn">${feedback}</section>` : ''}
    Go <a href="/">Home</a> or <a href="/login">Login</a>
</section>`)))}
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req
    const logic = logicFactory.create(req)

    try {
        logic.register(name, surname, email, password, passwordConfirm)
            .then(() => res.send(render(`<section class="register">
    <h2>Registration confirmation</h2>
    User <strong>${email}</strong> has been successfully registered! Please proceed to <a href="/login">Log in</a>.
    </form>
</section>`)))
            .catch(({ message }) => {
                req.session.feedback = message
                res.redirect('/register')
            })
    } catch ({ message }) {
        req.session.feedback = message
        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const feedback = pullFeedback(req)
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {res.send(render(`<section class="login">
    <h2>Log in</h2>
    <form method="POST" action="/login">
    <input name="email" type="email" placeholder="Email" required>
    <input name="password" type="password" placeholder="Password" required>
    <button type="submit">Log in</button>
    </form>
    ${feedback ? `<section class="feedback feecdack-warn">${feedback}</section>` : ''}
    Go <a href="/">Home</a> or <a href="/register">Register</a>
</section>`))}
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req
    const logic = logicFactory.create(req)

    try {
        logic.login(email, password)
            .then(() => res.redirect('/home'))
            .catch(({ message }) => {
                req.session.feedback = message
                res.redirect('/login')
        })
    } catch ({ message }) {
        req.session.feedback = message
        res.redirect('/login')
    }

})

app.get('/home', (req, res) => {

    try {
        const logic = logicFactory.create(req)
        if (logic.isUserLoggedIn) {

            logic.retrieveUser()
                .then(({ name }) => {
                    const feedback = pullFeedback(req)
                    res.send(render(`<section class="home">
    <h2>Home</h2>
    <p>Welcome ${name.toUpperCase()} to your home!</p>
    ${feedback ? `<section class="feedback feecdack-warn">${feedback}</section>` : ''}
    <form action="/logout" method="post">
        <button type="submit">Log Out</button>
    </form>
</section>`))
                })
                .catch(({ message }) => {
                    req.session.feedback = message
                    res.redirect('/home')
                })
        } else {
            res.redirect('login')
        }
    } catch ({ message }) {
        req.session.feedback = message
        res.redirect('/home')
    }
})

app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOut()

    res.redirect('/')
})

app.get('*', (req, res) => res.send(404, render(`<section class="not-found">
        <h2>NOT FOUND</h2>
        Go <a href="/">Home</a>
    </section>`)))

app.listen(port, () => console.log(`server running on port ${port}`))
