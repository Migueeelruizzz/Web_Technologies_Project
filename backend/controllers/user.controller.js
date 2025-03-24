const userService = require('../services/user.service');
const {
    createUserDto,
    updateUserDto,
    userToResponseDto,
} = require('../DTOS/user.dto');

// GET /users
async function getAllUsers(req, res) {
    try {
        const usuarios = await userService.findAll();
        // (Opcional) podrías mapear con userToResponseDto si no quieres exponer password
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ error: 'Error interno al obtener usuarios' });
    }
}

// GET /users/:id
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

        const user = await userService.findById(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Opcional: return res.status(200).json(userToResponseDto(user));
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// POST /users
async function createUser(req, res) {
    try {
        // 1. Validar y transformar con DTO
        const dto = createUserDto(req.body); 

        // 2. Crear el usuario
        const newUser = await userService.create(dto);

        // 3. (Opcional) filtrar password
        return res.status(201).json(userToResponseDto(newUser));
    } catch (error) {
        console.error('Error al crear usuario:', error);

        // Si es un error de validación manual (throw new Error)
        if (error.message.includes('required') || error.message.includes('must be')) {
            return res.status(400).json({ error: error.message });
        }

        // Prisma code: 'P2002' => unique constraint failed
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'El email ya está en uso' });
        }
        return res.status(500).json({ error: 'Error interno al crear usuario' });
    }
}

// PUT /users/:id
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

        // 1. Validar y transformar con DTO
        const dto = updateUserDto(req.body);

        // 2. Actualizar
        const updatedUser = await userService.update(Number(id), {
            name, email, password, role,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.status(200).json(userToResponseDto(updatedUser));
    } catch (error) {
        console.error('Error al actualizar usuario:', error);

        // Errores de validación manual
        if (error.message.includes('No fields to update') || error.message.includes('must be')) {
            return res.status(400).json({ error: error.message });
        }
        // Prisma: registro no encontrado
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Prisma: email duplicado
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'El email ya está en uso' });
        }
        return res.status(500).json({ error: 'Error interno al actualizar usuario' });
    }
}

// DELETE /users/:id
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
