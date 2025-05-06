const eventService = require('../services/event.service');
const { createEventDto, updateEventDto, eventToResponseDto } = require('../dtos/event.dto');

async function getAllEvents(req, res) {
    try {
        const events = await eventService.findAll();
        return res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        return res.status(500).json({ error: 'Error interno al obtener eventos' });
    }
}

async function getEventById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        const event = await eventService.findById(Number(id));
        if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
        return res.status(200).json(event);
    } catch (error) {
        console.error('Error al obtener evento:', error);
        return res.status(500).json({ error: 'Error interno al obtener evento' });
    }
}

async function createEvent(req, res) {
    try {
        const dto = createEventDto(req.body);
        const newEvent = await eventService.create(dto);
        return res.status(201).json(eventToResponseDto(newEvent));
    } catch (error) {
        console.error('Error al crear evento:', error);
        if (error.message.includes('required') || error.message.includes('Invalid date')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 'P2003') {
            return res.status(409).json({ error: 'No existe organizador con ese ID (FK constraint)' });
        }
        return res.status(500).json({ error: 'Error interno al crear evento' });
    }
}

async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        const dto = updateEventDto(req.body);
        const updatedEvent = await eventService.update(Number(id), dto);
        if (!updatedEvent) return res.status(404).json({ error: 'Evento no encontrado' });
        return res.status(200).json(eventToResponseDto(updatedEvent));
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        if (error.message.includes('No fields to update') || error.message.includes('Invalid date')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        if (error.code === 'P2003') {
            return res.status(409).json({ error: 'No existe organizador con ese ID (FK constraint)' });
        }
        return res.status(500).json({ error: 'Error interno al actualizar evento' });
    }
}

async function deleteEvent(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Falta el parámetro "id"' });
        await eventService.remove(Number(id));
        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        return res.status(500).json({ error: 'Error interno al eliminar evento' });
    }
}

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };