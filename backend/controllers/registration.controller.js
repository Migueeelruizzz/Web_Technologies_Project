const registrationService = require('../services/registration.service');
const { createRegistrationDto, updateRegistrationDto, registrationToResponseDto } = require('../dtos/registration.dto');

async function getAllRegistrations(req, res) {
    try {
        const registrations = await registrationService.findAll();
        return res.status(200).json(registrations);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        return res.status(500).json({ error: 'Error interno al obtener registros' });
    }
}

async function getRegistrationById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        const registration = await registrationService.findById(Number(id));
        if (!registration) return res.status(404).json({ error: 'Registro no encontrado' });
        return res.status(200).json(registration);
    } catch (error) {
        console.error('Error al obtener registro:', error);
        return res.status(500).json({ error: 'Error interno al obtener registro' });
    }
}

async function createRegistration(req, res) {
    try {
        const dto = createRegistrationDto(req.body);
        const newRegistration = await registrationService.create(dto);
        return res.status(201).json(registrationToResponseDto(newRegistration));
    } catch (error) {
        console.error('Error al crear registro:', error);
        if (error.message.includes('required')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 'P2003') {
            return res.status(409).json({ error: 'El userId o eventId no existe (violación de foreign key)' });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'El usuario ya está registrado en ese evento' });
        }
        return res.status(500).json({ error: 'Error interno al crear registro' });
    }
}

async function updateRegistration(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        const dto = updateRegistrationDto(req.body);
        const updatedReg = await registrationService.update(Number(id), dto);
        if (!updatedReg) return res.status(404).json({ error: 'Registro no encontrado' });
        return res.status(200).json(registrationToResponseDto(updatedReg));
    } catch (error) {
        console.error('Error al actualizar registro:', error);
        if (error.message.includes('No fields to update')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        if (error.code === 'P2003') {
            return res.status(409).json({ error: 'userId o eventId no existe (violación de foreign key)' });
        }
        return res.status(500).json({ error: 'Error interno al actualizar registro' });
    }
}

async function deleteRegistration(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        await registrationService.remove(Number(id));
        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        return res.status(500).json({ error: 'Error interno al eliminar registro' });
    }
}

module.exports = { getAllRegistrations, getRegistrationById, createRegistration, updateRegistration, deleteRegistration };