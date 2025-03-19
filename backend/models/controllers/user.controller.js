const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const createUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        // Aquí podrías usar un DTO o validaciones
        const newUser = await userService.create({ nombre, email, password });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear usuario' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const updatedUser = await userService.update(Number(id), { nombre, email, password });
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.remove(Number(id));
        return res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar usuario' });
        console.log('Usuario eliminado:', deletedUser);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
