const mongoose = require('mongoose');

const Team = require('./models/team.js')
const Player = require('./models/player.js')

const mongoURI = 'mongodb://localhost:27017/jon-project2';

mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log('the connection with mongod is established at', mongodbURI)
    }
);

async function seed() {

    // players 
    const kaka = await Player.create({
        name: 'Kaka',
        position: 'midfielder',
        jersey: '10',
        team: '',
        image: 'kaka',
        isActive: false
    });

    const maradona = await Player.create({
        name: 'Maradona',
        position: 'midfielder',
        jersey: '10',
        team: '',
        image: 'maradona',
        isActive: false
    });
    const maldini = await Player.create({
        name: 'Maldini',
        position: 'defender',
        jersey: '3',
        team: '',
        image: 'maldini',
        isActive: false
    });

    const rashford = await Player.create({
        name: 'Marcus Rashford',
        position: 'attacker',
        jersey: '10',
        team: '',
        image: 'rashford',
        isActive: true
    });

    const carlos = await Player.create({
        name: 'Roberto Carlos',
        position: 'defender',
        jersey: '3',
        team: '',
        image: 'carlos',
        isActive: true
    });
    const gyan = await Player.create({
        name: 'Gyan',
        position: 'attacker',
        jersey: '3',
        team: '',
        image: 'default',
        isActive: false
    });
    const kane = await Player.create({
        name: 'Harry Kane',
        position: 'attacker',
        jersey: '10',
        team: '',
        image: 'kane',
        isActive: true
    });
    const bruno = await Player.create({
        name: 'Bruno',
        position: 'midfielder',
        jersey: '10',
        team: '',
        image: 'bruno',
        isActive: true
    });
    const tevez = await Player.create({
        name: 'Carlos Tevez',
        position: 'attacker',
        jersey: '12',
        team: '',
        image: 'tevez',
        isActive: true
    });
    const cech = await Player.create({
        name: 'Petr Cech',
        position: 'goalkeeper',
        jersey: '1',
        team: '',
        image: 'cech',
        isActive: false
    });
    const mane = await Player.create({
        name: 'Sadio Mane',
        position: 'attacker',
        jersey: '10',
        team: '',
        image: 'mane',
        isActive: true
    });
    const salah = await Player.create({
        name: 'Mo Salah',
        position: 'attacker',
        jersey: '11',
        team: '',
        image: 'salah',
        isActive: true
    });
    const sancho = await Player.create({
        name: 'Jadon Sancho',
        position: 'attacker',
        jersey: '7',
        team: 'Dortmund',
        image: 'sancho',
        isActive: true
    });
    const haland = await Player.create({
        name: 'Erling Haland',
        position: 'attacker',
        jersey: '9',
        team: 'Dortmund',
        image: 'halang',
        isActive: true
    });
    const neymar = await Player.create({
        name: 'Neymar',
        position: 'attacker',
        jersey: '10',
        team: 'Paris St. Germain',
        image: 'neymar',
        isActive: true
    });
    const mbappe = await Player.create({
        name: 'Kylian Mbappé',
        position: 'attacker',
        jersey: '7',
        team: 'Paris St. Germain',
        image: 'mbappe',
        isActive: true
    });
    const hazard = await Player.create({
        name: 'Eden Hazard',
        position: 'attacker',
        jersey: '7',
        team: '',
        image: 'hazard',
        isActive: true
    });
    const martial = await Player.create({
        name: 'Anthony martial',
        position: 'attacker',
        jersey: '9',
        team: '',
        image: 'martial',
        isActive: true
    });

    const lukaku = await Player.create({
        name: 'R Lukaku',
        position: 'attacker',
        jersey: '9',
        team: '',
        image: 'lukaku',
        isActive: true
    });
    const alaba = await Player.create({
        name: 'David Alaba',
        position: 'defender',
        jersey: '27',
        team: '',
        image: 'alaba',
        isActive: true
    });
    const sane = await Player.create({
        name: 'Leroy Sane',
        position: 'defender',
        jersey: '10',
        team: '',
        image: 'sane',
        isActive: true
    });
    const neuer = await Player.create({
        name: 'Manuel Neuer',
        position: 'goalkeeper',
        jersey: '1',
        team: '',
        image: 'neuer',
        isActive: true
    });

    // teams
    const real = new Team({
        teamName: 'Real Madrid',
        manager: 'Zidane',
        players: [],
        teamColors: 'white',
    });
    const juve = new Team({
        teamName: 'Juventus',
        manager: 'Zidane',
        players: [],
        teamColors: 'black, white',
    });
    const bayern = new Team({
        teamName: 'Bayern Munich',
        manager: 'Flick',
        players: [],
        teamColors: 'red, white, blue',
    });
    const inter = new Team({
        teamName: 'Inter Milan',
        manager: 'Zidane',
        players: [],
        teamColors: 'blue, black',
    });
    const dortmund = new Team({
        teamName: 'Dortmund',
        manager: 'Favre',
        players: [],
        teamColors: 'yellow, black',
    });
    const psg = new Team({
        teamName: 'Paris St. Germain',
        manager: 'Tuchel',
        players: [],
        teamColors: 'blue, red',
    });

    // push players onto the player array on Teams
    psg.players.push(mbappe)
    psg.players.push(neymar)

    dortmund.players.push(sancho)
    dortmund.players.push(haland)

    inter.players.push(lukaku)
    real.players.push(hazard)

    
    psg.save(function (err, movie) {
        if (err) {
          console.log(err);
        } else {
          console.log('team is ', psg);
        }
    });

    dortmund.save(function (err, movie) {
        if (err) {
          console.log(err);
        } else {
          console.log('team is ', dortmund);
        }
    });
    inter.save(function (err, movie) {
        if (err) {
          console.log(err);
        } else {
          console.log('team is ', dortmund);
        }
    });

    juve.save(function (err, movie) {
        if (err) {
          console.log(err);
        } else {
          console.log('team is ', dortmund);
        }
    });

    bayern.save(function (err, movie) {
        if (err) {
          console.log(err);
        } else {
          console.log('team is ', dortmund);
        }
    });

    real.save(function (err, movie) {
        if (err) {
          console.log(err);
        } else {
          console.log('team is ', dortmund);
        }
    });
    

}

seed();


