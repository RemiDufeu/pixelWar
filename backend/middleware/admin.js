const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const tokenRaw = req.headers.authorization.split(' ')[1];
        const token = tokenRaw.replace(/['"]+/g, '')

        const decodedToken = jwt.verify(token, process.env.JWTCRYPT);
        
        const userRole = decodedToken.userRole;
        req.auth = decodedToken.userId
       if (userRole !== 'admin') {
            throw 'invalid role'
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error})
    }
}