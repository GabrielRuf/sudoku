const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).send('Um token é necessário para autenticação');
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Token inválido');
    }
    return next();
}

module.exports = verifyToken;
