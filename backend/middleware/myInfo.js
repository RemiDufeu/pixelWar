const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
    try {

        if(!req.params.id) {
            throw "Id is missing in the query"
        }

        const tokenRaw = req.headers.authorization.split(' ')[1];
        const token = tokenRaw.replace(/['"]+/g, '')
        
        const decodedToken = jwt.verify(token, process.env.JWTCRYPT)
        const userId = decodedToken.userId;

        if(req.params.id !== userId &&  'admin' !== decodedToken.userRole) {
            throw "This user doesn't have access to this ressource"
        }

        req.auth = { userId }
        
        next();
        
    } catch (error) {
        res.status(401).json({error : error})
    }
}