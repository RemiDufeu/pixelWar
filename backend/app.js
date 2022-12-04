const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const pixelBoardRoutes = require('./routes/pixelBoard')
const pixelRoutes = require('./routes/pixel')
const User = require('./models/User')
const PixelBoard = require('./models/PixelBoard')
const Pixel = require('./models/Pixel')

require('dotenv').config();

const usersData = require('./backupJson/users.json')
const pixelBoardData = require('./backupJson/pixelboards.json')
const pixelData = require('./backupJson/pixels.json')

const app = express()

mongoose.connect(process.env.MONGOCONNECTION,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .then(() => User.countDocuments())
  .then((count) => {
    if (count === 0) {
      User.insertMany(usersData)
      PixelBoard.insertMany(pixelBoardData)
      Pixel.insertMany(pixelData)
    }
  })
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  }
);

app.use(bodyParser.json())
app.use('/api/pixel', pixelRoutes)
app.use('/api/pixelboard', pixelBoardRoutes)
app.use('/api/auth', userRoutes)

module.exports = app