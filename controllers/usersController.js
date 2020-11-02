const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// new user route
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// post route
router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        console.log('user is created', createdUser)
        res.redirect('/')
    })
})

module.exports = router