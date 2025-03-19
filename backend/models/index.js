const express = require('express');
const userRoutes = require('./routes/user.routes');  // Importas las rutas
const app = express();
const PORT = 3000;

app.use(express.json());

// Asignas el endpoint '/usuarios' a las rutas de usuario
app.use('/usuarios', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
