const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

// GET (listar todos)
router.get('/', userController.getAllUsers);

// GET (obtener uno por ID)
router.get('/:id', userController.getUserById);

// POST (crear)
router.post('/', userController.createUser);

// PUT (actualizar)
router.put('/:id', userController.updateUser);

// DELETE (borrar)
router.delete('/:id', userController.deleteUser);

module.exports = router;
