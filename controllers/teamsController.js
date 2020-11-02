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

// team show route
router.get('/:id', async (req, res) => {
    let team = await Team.findById(req.params.id).populate('players');
    console.log(team);
    res.render('teams/show.ejs', { 
        team,
    })
})

// update route
router.put('/:id', async (req, res) => {
    console.log(req.body)
    
    // update team model with req body
    let team = await Team.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    // update player model 
    await team.players.forEach(async player => {
        console.log(player)
        console.log(team.teamName)
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
router.post('/', async (req, res) => {
    let team = await Team.create(req.body);
    res.redirect(`/teams/${team.id}`);
});

// edit route
router.get('/:id/edit', async (req, res) => {
    let team = await Team.findById(req.params.id).populate('players');
    let players = await Player.find({})
    console.log(team);
    res.render('teams/edit.ejs', { 
        team,
        players,
    })
})

// delete route
router.delete('/:id', async (req, res) => {
    await Team.findByIdAndDelete(req.params.id);
    res.redirect('/teams');
});

module.exports = router