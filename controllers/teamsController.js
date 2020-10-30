const router = require('express').Router()
const Team = require('../models/team')
const Player = require('../models/player')

// teams index page
router.get('/', async (req, res) => {
    let teams = await Team.find({})
    res.render('teams/index.ejs', { 
        teams 
    })
})

// new page route 
router.get('/new', async (req, res) => {
    let players = await Player.find({})
    res.render('teams/new.ejs', {
        players
    })
})

module.exports = router