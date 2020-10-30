const router = require('express').Router()
const Team = require('../models/team')

// teams index page
router.get('/', async (req, res) => {
    let teams = await Team.find({})
    res.render('teams/index.ejs', { 
        teams 
    })
})


module.exports = router