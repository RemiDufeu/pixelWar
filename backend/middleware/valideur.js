const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = (req, res, next) => {
    
    try {
        const userId = req.auth
        
        User.findOne({ _id : userId.userId})
        .then(data => {
            if (data.role !== 'admin' && data.role !== 'valideur' ) {
                throw 'role non valide'
            }
            validorString = data.prenom+" "+data.nom
            req.valideur = { validorString }
        })
        .then(()=> {
            next();   
            
        })
        .catch(error => res.status(401).json({error}))
    } catch (error) {
        res.status(401).json({error})
    }
}