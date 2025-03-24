const eventService = require('../services/event.service');
const {
    createEventDto,
    updateEventDto,
    eventToResponseDto,
} = require('../DTOS/event.dto');

// GET /events
async function getAllEvents(req, res) {
    try {
        const events = await eventService.findAll();
        return res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        return res.status(500).json({ error: 'Error interno al obtener eventos' });
    }
}

// GET /events/:id
async function getEventById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

        const event = await eventService.findById(Number(id));
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        return res.status(200).json(event);
    } catch (error) {
        console.error('Error al obtener evento:', error);
        return res.status(500).json({ error: 'Error interno al obtener evento' });
    }
}

// POST /events
async function createEvent(req, res) {
    try {
        // 1. Validar con DTO
        const dto = createEventDto(req.body);

        // 2. Crear
        const newEvent = await eventService.create(dto);
        return res.status(201).json(eventToResponseDto(newEvent));
    } catch (error) {
        console.error('Error al crear evento:', error);

        // Errores de validación manual
        if (error.message.includes('required') || error.message.includes('Invalid date')) {
            return res.status(400).json({ error: error.message });
        }

        // Prisma: foreign key no existe
        if (error.code === 'P2003') {
            return res.status(409).json({ error: 'No existe el organizador con ese ID (FK constraint)' });
        }
        return res.status(500).json({ error: 'Error interno al crear evento' });
    }
}

// PUT /events/:id
async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

        const dto = updateEventDto(req.body);
        const updatedEvent = await eventService.update(Number(id), dto);

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
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
            return res.status(409).json({ error: 'No existe el organizador con ese ID (FK constraint)' });
        }
        return res.status(500).json({ error: 'Error interno al actualizar evento' });
    }
}

// DELETE /events/:id
async function deleteEvent(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

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

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};
