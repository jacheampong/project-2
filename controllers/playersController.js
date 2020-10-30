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

// player edit view
router.get('/:id/edit',  async (req, res) => {
    let playerFound = await Player.findById(req.params.id)
    console.log(playerFound)
    res.render('players/edit.ejs', {
        player: playerFound
    })
})

// update route
router.put('/:id', async (req, res) => {
    console.log(req.body)
    // change radio button value to true/false
    // before saving to mongoDB
    req.body.isActive = (req.body.isActive === 'on') ? true : false
    let updatePlayer = await Player.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },)
    res.redirect('/players');
});

// delete route
router.delete('/:id', async (req, res) => {
    let deletedPlayer = await Player.findByIdAndRemove(req.params.id)
    res.redirect('/players');
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

// player show route 
router.get('/:id',  async (req, res) => {
    let playerFound = await Player.findById(req.params.id)
    res.render('players/show.ejs', {
        player: playerFound
    })
})


module.exports = router