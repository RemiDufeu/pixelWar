const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const PixelBoard = require('./models/PixelBoard');
const User = require('./models/User');

require('dotenv').config();


mongoose.connect(process.env.MONGOCONNECTION,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .then(()=> User.findOne({email: "dufeu.remi@gmail.com"}))
  .then((user)=> {
    let board = new PixelBoard({
        name: "test",
        status : "brouillon",
        width : 10,
        height : 10,
        creator : user,
        dateFin : new Date(),
        pixelsView : [],
        delais : 10
    })
    board.save()
    .then(()=> console.log("pixel board créé !"))
    .catch(error => console.error(error))
  })
.catch((err)=> console.error(err))