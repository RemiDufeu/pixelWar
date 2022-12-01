const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
    try {

        if (req.headers.authorization === undefined) {
            req.auth = null
        } else {
            const tokenRaw = req.headers.authorization.split(' ')[1];
            const token = tokenRaw.replace(/['"]+/g, '')
            const decodedToken = jwt.verify(token, process.env.JWTCRYPT)
            req.auth = decodedToken.userId
        }
        next();

    } catch (error) {
        res.status(401).json({error : error})
    }
}