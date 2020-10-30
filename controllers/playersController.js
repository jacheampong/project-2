const router = require('express').Router();

const Player = require('../models/player')

// players index page
router.get('/', async (req, res) => {
    let players = await Player.find({})
    console.log(players)
    res.render('players/index.ejs', { players });
})

module.exports = router