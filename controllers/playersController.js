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

// create route
router.post('/', async (req, res) => {
    console.log(req.body)
    // change radio button value to true/false
    // before saving to mongoDB
    req.body.isActive = (req.body.isActive === 'on') ? true : false
    let player = await Player.create(req.body)
    res.redirect('/players');
});

router.get('/:id',  async (req, res) => {
    let playerFound = await Player.findById(req.params.id)
    res.render('players/show.ejs', {
        player: playerFound
    })
})


module.exports = router