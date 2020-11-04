const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, default: '', },
    jersey: { type: String, default: '', },
    team: { type: String, default: '', },
    image: { type: String, default: 'default', },
    isActive: Boolean
})

module.exports = mongoose.model('Player', playerSchema);