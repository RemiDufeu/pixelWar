const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();

const User = require('../models/User')

exports.signUp = (req, res, next) => {

    if (req.body.password.length < 6) {
        return res.status(400).json({error: 'Password too short, 6 characters minimum'})
    }

    if (req.body.password !== req.body.passwordConfirm) {
        return res.status(400).json({error: 'Non-identical passwords'})
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({error: 'User already exists'})
        } else {
            bcrypt.hash(req.body.password, parseInt(process.env.NBHACH))
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        password: hash,
                    })
                    user.save()
                })
                .then(() => res.status(201).json({message: "User is created !"}))
                .catch(error => res.status(500).json({error}))
        }
    })
};

exports.signIn = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'User not found !'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Incorrect password !'})
                    }
                    res.status(200).json({
                        userId: user.id,
                        userRole: user.role,
                        token: jwt.sign(
                            {
                                userId: user.id,
                                userRole: user.role
                            },
                            process.env.JWTCRYPT,
                            {expiresIn: "30d"}
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
        jwt.verify(token, process.env.JWTCRYPT)
        res.status(200).json({message: 'User is authenticated', user: jwt.decode(token)})

    } catch (error) {
        res.status(401).json({error: 'Unauthenticated request !'})
    }

}

exports.getUsers = (req, res, next) => {
    User.find({})
        .then(users => res.status(200).json({message: 'Users found', data: users}))
        .catch(error => res.status(400).json({error}))
}

exports.getUser = (req, res, next) => {
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json({message: 'User found', data: user}))
        .catch(error => res.status(400).json({error}))
}
exports.updateUser = (req, res, next) => {
    User.updateOne({_id: req.params.id}, {email: req.body.email, nom: req.body.nom, prenom: req.body.prenom})
        .then(() => res.status(200).json({message: 'User updated !'}))
        .catch(error => res.status(400).json({error}));
}
exports.updateRole = (req, res, next) => {
    User.updateOne({_id: req.params.id}, {role: req.body.role})
        .then(() => res.status(200).json({message: 'Role updated !'}))
        .catch(error => res.status(400).json({error}));
}
exports.updatePassword = (req, res, next) => {
    //verification du nouveau mdp
    if (req.body.newPassword.length < 6) {
        return res.status(400).json({error: 'The new password is too short, 6 characters minimum'})
    }
    if (req.body.newPassword !== req.body.passwordConfirm) {
        return res.status(400).json({error: 'Non-identical passwords'})
    }
    //verification du mdp actuel puis modification
    //si le mdp actuel est incorrect y aura pas de modif
    User.findOne({_id: req.params.id}).then(user => {
        if (!req.body.password) {
            return res.status(400).json({error: 'You must indicate the current password !'})
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                        if (!valid) {
                            return res.status(400).json({error: 'The current password is incorrect !'})
                        } else {
                            bcrypt.hash(req.body.newPassword, parseInt(process.env.NBHACH))
                                .then(hash => {
                                    User.updateOne({_id: req.params.id}, {password: hash})
                                        .then(() => res.status(200).json({message: 'Password updated !'}))
                                        .catch(error => res.status(400).json({error}));
                                })
                        }
                    }
                )
        }


    })


}
exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'User deleted !'}))
        .catch(error => res.status(400).json({error}));
}