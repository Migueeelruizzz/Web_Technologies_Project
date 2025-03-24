// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // El header vendrá como "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }
        // Guardamos el payload en req.user
        req.user = decoded; // { userId, role, iat, exp, etc. }
        next();
    });
}

module.exports = { authenticateToken };
