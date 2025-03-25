// backend/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API Documentada',
            version: '1.0.0',
            description: 'Documentación de la API con Swagger',
        },
    },
    apis: [
        './routes/*.js',      // Rutas donde pondrás comentarios de Swagger
        './controllers/*.js', // Si también quieres documentar en controladores
    ],
};

// Genera la especificación OpenAPI
const swaggerSpec = swaggerJsdoc(swaggerOptions);

function setupSwagger(app) {
    // Ruta donde se sirve la documentación
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = { setupSwagger };
