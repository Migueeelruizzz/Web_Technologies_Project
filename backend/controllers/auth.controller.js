// controllers/auth.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Verificar que vengan email y password
        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan credenciales' });
        }

        // 2. Buscar usuario en DB (ajusta según tu modelo)
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // 3. Comparar contraseña (aquí suponemos en texto plano; en prod, usa bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // 4. Crear token con claims (userId, role, etc.)
        const token = jwt.sign(
            { userId: user.id, role: user.role },        // Payload
            process.env.JWT_SECRET,                     // Clave secreta
            { expiresIn: '1h' }                         // Opcional: expira en 1 hora
        );

        // 5. Devolver token al cliente
        return res.json({ token });
    } catch (error) {
        console.error('Error al hacer login:', error);
        return res.status(500).json({ error: 'Error interno de servidor' });
    }
}

module.exports = {
    login,
};
