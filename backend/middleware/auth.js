const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
    try {

        const tokenRaw = req.headers.authorization.split(' ')[1];
        if (tokenRaw=="null") {
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