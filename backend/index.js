require('dotenv').config({ path: './.env' });


console.log('DATABASE_URL is:', process.env.DATABASE_URL);


const express = require('express');
const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const registrationRoutes = require('./routes/registration.routes');

const app = express();
const errorHandler = require('./middlewares/errorHandler');
const PORT = 3000;

app.use(express.json());

app.use(errorHandler);
app.use('/users', userRoutes); // <--- Montas las rutas en "/users"
app.use('/events', eventRoutes);
app.use('/registrations', registrationRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
