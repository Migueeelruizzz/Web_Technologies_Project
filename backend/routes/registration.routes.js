const { Router } = require('express');
const registrationController = require('../controllers/registration.controller');

const router = Router();

/**
 * @openapi
 * /registrations:
 *   get:
 *     summary: Obtiene todas las inscripciones
 *     tags:
 *       - Registrations
 *     responses:
 *       200:
 *         description: Lista de inscripciones
 */
router.get('/', registrationController.getAllRegistrations);

/**
 * @openapi
 * /registrations/{id}:
 *   get:
 *     summary: Obtiene una inscripción por ID
 *     tags:
 *       - Registrations
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la inscripción
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscripción encontrada
 *       404:
 *         description: Inscripción no encontrada
 */
router.get('/:id', registrationController.getRegistrationById);

/**
 * @openapi
 * /registrations:
 *   post:
 *     summary: Crea una nueva inscripción
 *     tags:
 *       - Registrations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Inscripción creada
 */
router.post('/', registrationController.createRegistration);

/**
 * @openapi
 * /registrations/{id}:
 *   put:
 *     summary: Actualiza una inscripción
 *     tags:
 *       - Registrations
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la inscripción a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Inscripción actualizada
 *       404:
 *         description: Inscripción no encontrada
 */
router.put('/:id', registrationController.updateRegistration);

/**
 * @openapi
 * /registrations/{id}:
 *   delete:
 *     summary: Elimina una inscripción
 *     tags:
 *       - Registrations
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la inscripción a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Inscripción eliminada
 *       404:
 *         description: Inscripción no encontrada
 */
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;
