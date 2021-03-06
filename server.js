//___________________
//Dependencies
//___________________
require('dotenv').config()
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session')
const app = express();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'jon-project2';
// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});
//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)
//___________________
// Routes
//___________________

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
      return next()
  } else {
      res.redirect('/sessions/new')
  }
}

//localhost:3000
app.get('/', isAuthenticated, (req, res) => {
  // res.send('Hello World!');
  res.render('home.ejs')
});

// Players Controller
const playersController = require('./controllers/playersController')
app.use('/players', playersController)

// Teams Controller
const teamsController = require('./controllers/teamsController')
app.use('/teams', teamsController)

// Users Controller
const usersController = require('./controllers/usersController')
app.use('/users', usersController)

// Session Controller
const sessionsController = require('./controllers/sessionsController')
app.use('/sessions', sessionsController)

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));