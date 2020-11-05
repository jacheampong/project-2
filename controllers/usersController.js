const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// new user route
router.get('/new', (req, res) => {
    res.render('users/new.ejs'), {
        currentUser: req.session.currentUser
    }
})

// post route
router.post('/', (req, res) => {

    //overwrite the user password with the hashed password
    req.body.password = bcrypt.hashSync(
        req.body.password, bcrypt.genSaltSync(10)
    )

    User.create(req.body, (err, createdUser) => {
        console.log('user is created', createdUser)
        res.redirect('/')
    })
})

module.exports = router