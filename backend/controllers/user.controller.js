const userService = require('../services/user.service');
const { createUserDto, updateUserDto, userToResponseDto } = require('../dtos/user.dto');

async function getAllUsers(req, res) {
    try {
        const usuarios = await userService.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ error: 'Error interno al obtener usuarios' });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        const user = await userService.findById(Number(id));
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function createUser(req, res) {
    try {
        const dto = createUserDto(req.body);
        const newUser = await userService.create(dto);
        return res.status(201).json(userToResponseDto(newUser));
    } catch (error) {
        console.error('Error al crear usuario:', error);
        if (error.message.includes('required') || error.message.includes('must')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'El email ya está en uso' });
        }
        return res.status(500).json({ error: 'Error interno al crear usuario' });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        const dto = updateUserDto(req.body);
        const updatedUser = await userService.update(Number(id), dto);
        if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
        return res.status(200).json(userToResponseDto(updatedUser));
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        if (error.message.includes('No fields to update') || error.message.includes('must')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'El email ya está en uso' });
        }
        return res.status(500).json({ error: 'Error interno al actualizar usuario' });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        await userService.remove(Number(id));
        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.status(500).json({ error: 'Error interno al eliminar usuario' });
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };