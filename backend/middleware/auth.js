const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const tokenRaw = req.headers.authorization.split(' ')[1];
        const token = tokenRaw.replace(/['"]+/g, '')
        
        const decodedToken = jwt.verify(token, process.env.JWTCRYPT)
        const userId = decodedToken.userId;
        req.auth = { userId }
        
        next();
        
    } catch (error) {
        res.status(401).json({error : error})
    }
}