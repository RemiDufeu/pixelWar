const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./models/User')

require('dotenv').config();


mongoose.connect(process.env.MONGOCONNECTION,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .then(()=> {
    let motDePasse = 'admin123';
    bcrypt.hash(motDePasse,parseInt(process.env.NBHACH))
    .then(hash => {
        const user = new User({
            email: "dufeu.remi@gmail.com",
            nom : "Admin",
            prenom : "Admin",
            password : hash,
            role : "admin"
        })
        user.save()
    })
    .then(()=> console.log("utilisateur créé !"))
    .catch(error => console.error(error))
  })
.catch((err)=> console.error(err))

