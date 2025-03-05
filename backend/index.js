const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json()); // Permite recibir JSON en las peticiones

// Ruta para crear un usuario
app.post('/usuarios', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const nuevoUsuario = await prisma.usuario.create({
            data: { nombre, email, password },
        });
        res.json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

// Ruta para listar usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
