const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const router = Router();

// Definimos la ruta POST /login
router.post('/login', login);

module.exports = router;