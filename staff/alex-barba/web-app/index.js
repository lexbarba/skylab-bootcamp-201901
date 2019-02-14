const express = require('express')
const bodyParser = require('body-parser')
const logicFactory = require('./src/logic-factory')
const session = require('express-session')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(session({
    secret: 'a secret phrase used to encrypt data that flows from server to client and viceversa',
    resave: true,
    saveUninitialized: true
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

app.get('/register', (req, res) => {
    const feedback = pullFeedback(req)

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
</section>`)))
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
    res.send(render(`<section class="login">
    <h2>Log in</h2>
    <form method="POST" action="/login">
    <input name="email" type="email" placeholder="Email" required>
    <input name="password" type="password" placeholder="Password" required>
    <button type="submit">Log in</button>
    </form>
    ${feedback ? `<section class="feedback feecdack-warn">${feedback}</section>` : ''}
</section>`))
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req
    const logic = logicFactory.create(req)

    try {
        if (logic.isUserLoggedIn) {
        logic.login(email, password)
            .then(() => res.redirect('/home'))
            .catch(({ message }) => {
                req.session.feedback = message
                res.redirect('/login')
        })} else {
            res.redirect('/home')
        }
    } catch ({ message }) {
        req.session.feedback = message
        res.redirect('/login')
    }

})

app.get('/home', (req, res) => {
    const logic = logicFactory.create(req)

    try {
        if (logic.isUserLoggedIn) {

            logic.retrieveUser()
                .then(({ name }) => {
                    const feedback = pullFeedback(req)
                    res.send(render(`<section class="home">
    <h2>Home</h2>
    <p>Welcome ${name.toUpperCase()} to your home!</p>
    ${feedback ? `<section class="feedback feecdack-warn">${feedback}</section>` : ''}
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

app.listen(port, () => console.log(`server running on port ${port}`))
