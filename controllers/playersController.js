const router = require('express').Router();

const Player = require('../models/player')

// players index page
router.get('/', async (req, res) => {
    let players = await Player.find({})
    console.log(players)
    res.render('players/index.ejs', { players });
})


// new page route 
router.get('/new', async (req, res) => {
    res.render('players/new.ejs')
})

module.exports = router