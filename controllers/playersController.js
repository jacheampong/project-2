const router = require('express').Router();

const Player = require('../models/player')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// players index page
router.get('/', isAuthenticated, async (req, res) => {
    let players = await Player.find({})
    let activePlayers = players.filter(player => {
        return player.isActive === true
    })
    console.log(activePlayers)
    let notActivePlayers = players.filter(player => {
        return player.isActive !== true
    })
    console.log(notActivePlayers)
    // console.log(players)
    res.render('players/index.ejs', { 
        players,
        activePlayers,
        notActivePlayers,
        currentUser: req.session.currentUser 
    });
})

// new page route 
router.get('/new', isAuthenticated, async (req, res) => {
    res.render('players/new.ejs', {
        currentUser: req.session.currentUser
    })
})

// player edit view
router.get('/:id/edit', isAuthenticated,  async (req, res) => {
    let playerFound = await Player.findById(req.params.id)
    console.log(playerFound)
    res.render('players/edit.ejs', {
        player: playerFound,
        currentUser: req.session.currentUser
    })
})

// update route
router.put('/:id', isAuthenticated, async (req, res) => {
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
router.delete('/:id', isAuthenticated, async (req, res) => {
    let deletedPlayer = await Player.findByIdAndRemove(req.params.id)
    res.redirect('/players');
})

// create route
router.post('/', isAuthenticated, async (req, res) => {
    console.log(req.body)
    // change radio button value to true/false
    // before saving to mongoDB
    req.body.isActive = (req.body.isActive === 'on') ? true : false
    let player = await Player.create(req.body)
    res.redirect('/players');
});

// player show route 
router.get('/:id', isAuthenticated,  async (req, res) => {
    let playerFound = await Player.findById(req.params.id)
    res.render('players/show.ejs', {
        player: playerFound,
        currentUser: req.session.currentUser
    })
})


module.exports = router