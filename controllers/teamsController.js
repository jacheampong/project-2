const router = require('express').Router()
const Team = require('../models/team')
const Player = require('../models/player')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// teams index page
router.get('/', isAuthenticated, async (req, res) => {
    let teams = await Team.find({})
    res.render('teams/index.ejs', { 
        teams,
        currentUser: req.session.currentUser
    })
})

// new page route 
router.get('/new', isAuthenticated, async (req, res) => {
    let players = await Player.find({})
    res.render('teams/new.ejs', {
        players,
        currentUser: req.session.currentUser
    })
})

// team show route
router.get('/:id', isAuthenticated, async (req, res) => {
    let team = await Team.findById(req.params.id).populate('players');
    console.log(team);
    res.render('teams/show.ejs', { 
        team,
        currentUser: req.session.currentUser
    })
})

// update route
router.put('/:id', isAuthenticated, async (req, res) => {
    console.log(req.body)
    
    // update team model with req body
    let team = await Team.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    // update player model 
    await team.players.forEach(async player => {
        // console.log(player)
        // console.log(team.teamName)
        try{
            let newPlayer = await Player.findByIdAndUpdate(player, {
                team: team.teamName},
                {new: true},)
                // console.log(newPlayer)
        } 
        catch(err) {
            console.log(err) 
        }
    })

    res.redirect(`/teams/${team.id}`);
})

// create route
router.post('/', isAuthenticated, async (req, res) => {
    let team = await Team.create(req.body)

    // update player model 
    await team.players.forEach(async player => {
        try{
            let newPlayer = await Player.findByIdAndUpdate(player, {
                team: team.teamName},
                {new: true},)
                // console.log(newPlayer)
        } 
        catch(err) {
            console.log(err) 
        }
    })

    res.redirect(`/teams/${team.id}`);
});

// edit route
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    let team = await Team.findById(req.params.id).populate('players');
    let players = await Player.find({isActive: true, team: ""})
    console.log(team);
    res.render('teams/edit.ejs', { 
        team,
        players,
        currentUser: req.session.currentUser,
    })
})

// delete route
router.delete('/:id', isAuthenticated, async (req, res) => {
    await Team.findByIdAndDelete(req.params.id);
    res.redirect('/teams');
});

module.exports = router