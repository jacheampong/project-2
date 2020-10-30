const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, default: '', },
    jersey: { type: String, default: '', },
    isActive: Boolean
})

module.exports = mongoose.model('Player', playerSchema);