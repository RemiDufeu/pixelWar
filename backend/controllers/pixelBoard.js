

const PixelBoard = require('../models/PixelBoard')

exports.create = (req, res, next) => {
    
    const pixelBoard = new PixelBoard({
        name: req.body.name,
        width: req.body.width,
        height: req.body.height,        
        isPublic : req.body.isPublic,
        mode : req.body.mode,
        creator: req.auth,
        dateFin: req.body.dateFin,
        pixelsView: new Array(req.body.height * req.body.width).fill(null),
        delais: req.body.delais
    })
    pixelBoard.save()
        .then(() => res.status(201).json({ message : "PixelBoard créé !"}))
        .catch(error => res.status(400).json({error}))
};

exports.getAll = (req, res, next) => {
    PixelBoard.find()
        .then(pixelBoard => res.status(200).json(pixelBoard))
        .catch(error => res.status(400).json({error}))
};

exports.getAllPublicActif = (req, res, next) => {
    PixelBoard.find({isPublic : true, status : 'actif'})
        .then(pixelBoards => res.status(200).json(pixelBoards))
        .catch(error => res.status(400).json({error}))
};

exports.getAllActif = (req, res, next) => {
    PixelBoard.find({status : 'actif'})
        .then(pixelBoards => res.status(200).json(pixelBoards))
        .catch(error => res.status(400).json({error}))
};

exports.getOne = (req, res, next) => {
    PixelBoard.findOne({ _id: req.params.id })
        .then(pixelBoard => res.status(200).json(pixelBoard))
        .catch(error => res.status(404).json({error}))
}

exports.putPixel = (req, res, next) => {
    PixelBoard.findOne({ _id: req.params.id })
        .then(pixelBoard => {
            let indexPx = req.body.x + (req.body.y * pixelBoard.width)
            if(pixelBoard.pixelsView[indexPx] != null){
                res.status(400).json({error : "Pixel déjà pris"})
            } else {
                pixelBoard.pixelsView[indexPx] = req.body.color
                pixelBoard.save()
                    .then(() => res.status(200).json({message : "Pixel mis à jour"}))
                    .catch(error => res.status(400).json({error}))
            }
        })
        .catch(error => res.status(404).json({error}))
}           