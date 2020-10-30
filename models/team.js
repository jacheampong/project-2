const mongoose = require('mongoose');

// const colorSchema = new mongoose.Schema({
//     name: String,
// });

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    manager: { type: String, required: true},

    // embed color in team
    // teamColors: [colorSchema],
    teamColors: { type: String, default: ''},
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },],
});

const Team = mongoose.model('Team', teamSchema);
// const Color = mongoose.model('Color', colorSchema);

module.exports = Team