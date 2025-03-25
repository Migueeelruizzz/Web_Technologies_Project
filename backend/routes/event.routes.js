const { Router } = require('express');
const eventController = require('../controllers/event.controller');

const router = Router();

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Obtiene todos los eventos
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get('/', eventController.getAllEvents);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Obtiene un evento por ID
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del evento
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */
router.get('/:id', eventController.getEventById);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               organizerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Evento creado
 */
router.post('/', eventController.createEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Actualiza un evento
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del evento a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               organizerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: Evento no encontrado
 */
router.put('/:id', eventController.updateEvent);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Elimina un evento
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del evento a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento eliminado
 *       404:
 *         description: Evento no encontrado
 */
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
