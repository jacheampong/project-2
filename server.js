const express = require('express')

// CONFIGURATION
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Test route ready!')
})

// Listener
app.listen(PORT, () => {
    console.log('🍒🍋Listening on port🥝🍉', PORT)
})
