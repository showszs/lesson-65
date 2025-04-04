import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'

const app = express()
const PORT = 3000

const mockUser = {
    id: '13',
    email: 'example@gmail.com',
    password: 'password'
}

const sessionOptions = {
    secret: '123',
    resave: false,
    saveUninitialized: false,
}

passport.use(
    new Strategy({ usernameField: 'email' }, (email, password, done) => {
        console.log('email:', email)
        console.log('password:', password)
        if (email === mockUser.email && password === mockUser.password) {
            return done(null, mockUser)
        } else {
            return done(null, false, { message: 'Invalid data' })
        }
    })
)

app.use(express.urlencoded({ extended: true }))
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id) 
})

passport.deserializeUser((id, done) => {
    if ( id === mockUser.id) {
        done(null, mockUser)
    } else {
        done(new Error('Invalid users\' id'))
    }
})
 
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Successfuly')
})

app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('This page is protected')
    } else {
        res.status(401).send('You don\'t have enough rights for access')
    }
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} PORT`)
})