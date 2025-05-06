require('dotenv').config();
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan credenciales' });
        }

        // Usar prisma.users en lugar de prisma.user
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ token });
    } catch (error) {
        console.error('Error al hacer login:', error);
        return res.status(500).json({ error: 'Error interno de servidor' });
    }
}

module.exports = { login };