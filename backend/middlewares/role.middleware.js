function authorizeRole(roles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'No estás autenticado' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'No tienes permiso para esta acción' });
        }
        next();
    };
}

module.exports = { authorizeRole };

//Si quieres que solo un admin pueda eliminar usuarios, por ejemplo,
//añade un middleware que verifique req.user.role.