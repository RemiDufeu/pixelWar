const jwt = require('jsonwebtoken');
const PixelBoard = require('../models/PixelBoard');
require('dotenv').config();

module.exports = (req, res, next) => {

    PixelBoard.findOne({ _id: req.params.id })
    .then(pixelBoard => {
        if(pixelBoard.isPublic){
            next()
        } else {
            try {
                const tokenRaw = req.headers.authorization.split(' ')[1];
                const token = tokenRaw.replace(/['"]+/g, '')
                
                const decodedToken = jwt.verify(token, process.env.JWTCRYPT)
                const userId = decodedToken.userId;
                req.auth = { userId }
                
                next();
                
            } catch (error) {
                res.status(401).json({error})
            }
        }
    })
    .catch(error => res.status(404).json({error}))
}