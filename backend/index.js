require('dotenv').config({ path: './.env' });


console.log('DATABASE_URL is:', process.env.DATABASE_URL);


const express = require('express');
const userRoutes = require('./routes/user.routes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes); // <--- Montas las rutas en "/users"

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
