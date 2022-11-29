const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
    try {

        if(!req.params.id) {
            throw "pas d'id dans la requête"
        }

        const tokenRaw = req.headers.authorization.split(' ')[1];
        const token = tokenRaw.replace(/['"]+/g, '')
        
        const decodedToken = jwt.verify(token, process.env.JWTCRYPT)
        const userId = decodedToken.userId;

        if(req.params.id !== userId &&  'admin' !== decodedToken.userRole) {
            throw "L'utilsateur n'a pas accès à cette ressource"
        }

        req.auth = { userId }
        
        next();
        
    } catch (error) {
        res.status(401).json({error : error})
    }
}