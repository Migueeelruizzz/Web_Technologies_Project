const { Router } = require('express');
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

const router = Router();

/*router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);*/

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', authenticateToken, userController.updateUser);
//Así, solo un usuario cuyo role sea 'admin' podrá eliminar usuarios.
router.delete('/:id',
    authenticateToken,
    authorizeRole(['ADMIN']),
    userController.deleteUser
);

module.exports = router;


//Ahora, si el cliente no envía un Bearer token válido, el middleware devolverá 401 o 403.


