const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();

const User = require('../models/User')

exports.signUp = (req, res, next) => {

    if(req.body.password.length < 6) {
        return res.status(400).json({error : 'Mot de passe trop court, 6 caractères minimum'})
    }

    if(req.body.password !== req.body.passwordConfirm) {
        return res.status(400).json({error : 'Mot de passe non identique'})
    }

    User.findOne({ email : req.body.email}).then(user => {
        if(user) {
            return res.status(400).json({error : 'Utilisateur déjà existant'})
        } else {
            bcrypt.hash(req.body.password,parseInt(process.env.NBHACH))
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    nom : req.body.nom,
                    prenom : req.body.prenom,
                    password : hash,
                })
                user.save()
            })
            .then(()=> res.status(201).json({ message : "Utilisateur créé !"}))
            .catch(error => res.status(500).json({error}))
        }
    })
};

exports.signIn = (req, res, next) => {
    User.findOne({ email : req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error : 'Utilisateur non trouvé !'})
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'})
                }
                res.status(200).json({
                    userId : user.id,
                    userRole : user.role,
                    token : jwt.sign(
                        { 
                            userId : user.id,
                            userRole : user.role
                        },
                        process.env.JWTCRYPT,
                        { expiresIn : "30d"}
                    )
                })
            })
            .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}))
};

exports.signInToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
    jwt.verify(token,process.env.JWTCRYPT)
    res.status(200).json({ message: 'Utlisateur authentifié', user : jwt.decode(token)})
    
    } catch(error) {
        res.status(401).json({error : 'Requête non authentifiée !'})
    }
    
}

exports.getUsers = (req, res, next) => {
    User.find({})
        .then(users => res.status(200).json({ message: 'Objets trouvés', data: users }))
        .catch(error => res.status(400).json({ error }))
}

exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json({ message: 'Objet trouvé', data: user }))
        .catch(error => res.status(400).json({ error }))
}
exports.updateUser = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {email:req.body.email,nom:req.body.nom,prenom:req.body.prenom})
        .then(() => res.status(200).json({ message: 'User modifié !' }))
        .catch(error => res.status(400).json({ error }));
}
exports.updateRole = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { role : req.body.role })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
}