const userService = require('../services/user.service');

async function getAllUsers(req, res) {
    try {
        const usuarios = await userService.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error); // <--- Muestra en consola
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await userService.findById(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
}

async function createUser(req, res) {
    try {
        const { email, name, password } = req.body;
        const newUser = await userService.create({ email, name, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { email, name, password } = req.body;
        const updatedUser = await userService.update(Number(id), {
            email,
            name,
            password,
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        await userService.remove(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
