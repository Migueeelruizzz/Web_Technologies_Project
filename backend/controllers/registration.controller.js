const registrationService = require('../services/registration.service');

// GET /registrations
async function getAllRegistrations(req, res) {
    try {
        const registrations = await registrationService.findAll();
        res.status(200).json(registrations);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ error: 'Error interno al obtener registros' });
    }
}

// GET /registrations/:id
async function getRegistrationById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

        const registration = await registrationService.findById(Number(id));
        if (!registration) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.status(200).json(registration);
    } catch (error) {
        console.error('Error al obtener registro:', error);
        res.status(500).json({ error: 'Error interno al obtener registro' });
    }
}

// POST /registrations
async function createRegistration(req, res) {
    try {
        const { userId, eventId } = req.body;
        if (!userId || !eventId) {
            return res.status(400).json({ error: 'Faltan campos obligatorios (userId, eventId)' });
        }

        const newRegistration = await registrationService.create({
            userId: Number(userId),
            eventId: Number(eventId),
        });
        res.status(201).json(newRegistration);
    } catch (error) {
        console.error('Error al crear registro:', error);
        // Si foreign key userId o eventId no existe
        if (error.code === 'P2003') {
            return res
                .status(409)
                .json({ error: 'El userId o eventId no existe (violación de foreign key)' });
        }
        // Si ya existe la combinación userId-eventId (si tienes un unique en Registration)
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'El usuario ya está registrado en ese evento' });
        }
        res.status(500).json({ error: 'Error interno al crear registro' });
    }
}

// PUT /registrations/:id
async function updateRegistration(req, res) {
    try {
        const { id } = req.params;
        const { userId, eventId } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }
        if (!userId && !eventId) {
            return res
                .status(400)
                .json({ error: 'No se han proporcionado campos (userId, eventId) para actualizar.' });
        }

        const updatedRegistration = await registrationService.update(Number(id), {
            userId: userId ? Number(userId) : undefined,
            eventId: eventId ? Number(eventId) : undefined,
        });
        if (!updatedRegistration) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.status(200).json(updatedRegistration);
    } catch (error) {
        console.error('Error al actualizar registro:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        if (error.code === 'P2003') {
            return res
                .status(409)
                .json({ error: 'userId o eventId no existe (violación de foreign key)' });
        }
        res.status(500).json({ error: 'Error interno al actualizar registro' });
    }
}

// DELETE /registrations/:id
async function deleteRegistration(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

        await registrationService.remove(Number(id));
        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.status(500).json({ error: 'Error interno al eliminar registro' });
    }
}

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration,
};
