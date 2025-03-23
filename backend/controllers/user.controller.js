const userService = require('../services/user.service');

// GET /users
async function getAllUsers(req, res) {
    try {
        const usuarios = await userService.findAll();
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
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// POST /users
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        // Validaciones básicas
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios (name, email, password)' });
        }

        const newUser = await userService.create({ name, email, password });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        // Prisma code: 'P2002' => Unique constraint failed (ej. email duplicado)
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
        const { email, name, password } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }
        if (!email && !name && !password) {
            return res.status(400).json({ error: 'No se han proporcionado campos para actualizar.' });
        }

        const updatedUser = await userService.update(Number(id), { email, name, password });
        // Si tu service devuelve null cuando no encuentra el usuario, podrías hacer:
        // if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        // Si es un error de Prisma que indica que no encontró el registro:
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Si es un error de unique constraint (email duplicado):
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
        return res.status(204).send(); // No Content
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        // Si Prisma lanza P2025 => no encontró el registro
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
