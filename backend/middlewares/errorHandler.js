// errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Si ya se ha enviado la respuesta, no hagas nada
    if (res.headersSent) {
        return next(err);
    }

    // Lógica: si es un error de validación, 400, si es duplicado 409, etc.
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // Por defecto, 500
    res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;