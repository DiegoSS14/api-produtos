const jwt = require('jsonwebtoken');
require('dotenv').config();

// Validação manual
const authMiddleware = (request, response, next) => {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({error: 'Token não fornecido'});
    }

    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).json({error: 'Token inválido'})
    }
};

module.exports = authMiddleware;