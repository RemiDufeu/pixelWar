const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWTCRYPT);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable'
        } else if (req.body.userRole && req.body.userRole !== userRole) {
            throw 'role non défini'
        } else if (userRole !== 'admin') {
            throw 'role non valide'
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error})
    }
}