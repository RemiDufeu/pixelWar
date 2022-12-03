const Pixel = require("../models/Pixel");
const jwt = require('jsonwebtoken')

const User = require('../models/User')

/*exports.create = (req, res, next) => {
    const pixel = new Pixel({
        x: req.body.x,
        y: req.body.y,
        color: req.body.color,
        creator: req.auth,
        board:req.params.id
    })
    pixel.save()
        .then(() => res.status(201).json({ message : "Pixel créé !"}))
        .catch(error => res.status(400).json({error}))
};*/

exports.getOne = (req, res, next) => {
    Pixel.findOne({ _id: req.params.id })
        .then(pixel=> res.status(200).json(pixel))
        .catch(error => res.status(404).json({error}))
}

exports.getUserPixel = (req, res, next) => {
    Pixel.findOne({x: req.params.x, y: req.params.y, board: req.params.id})
        .then(pixel=> User.findOne({_id: pixel.creator})
        .then(user => res.status(200).json({user: user, pixel: pixel})))
        .catch(error => res.status(404).json({error}))
}

