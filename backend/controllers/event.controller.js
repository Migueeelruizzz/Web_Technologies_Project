const eventService = require('../services/event.service');

// GET /events
async function getAllEvents(req, res) {
    try {
        const events = await eventService.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: 'Error interno al obtener eventos' });
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
        res.status(200).json(event);
    } catch (error) {
        console.error('Error al obtener evento:', error);
        res.status(500).json({ error: 'Error interno al obtener evento' });
    }
}

// POST /events
async function createEvent(req, res) {
    try {
        const { title, description, date, location, organizerId } = req.body;

        // Validaciones mínimas
        if (!title || !description || !date || !location || !organizerId) {
            return res.status(400).json({ error: 'Faltan campos obligatorios para crear evento' });
        }

        const newEvent = await eventService.create({
            title,
            description,
            date: new Date(date), // parse fecha si viene como string
            location,
            organizerId: Number(organizerId),
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error al crear evento:', error);

        // Si es un error de foreign key (por ejemplo, organizerId no existe)
        if (error.code === 'P2003') {
            return res.status(409).json({ error: 'No existe el organizador con ese ID (FK constraint)' });
        }
        res.status(500).json({ error: 'Error interno al crear evento' });
    }
}

// PUT /events/:id
async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const { title, description, date, location, organizerId } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Falta el parámetro "id" en la ruta.' });
        }

        const updatedEvent = await eventService.update(Number(id), {
            title,
            description,
            date: date ? new Date(date) : undefined, // Solo parsea si viene date
            location,
            organizerId: organizerId ? Number(organizerId) : undefined,
        });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error al actualizar evento:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        if (error.code === 'P2003') {
            return res.status(409).json({ error: 'No existe el organizador con ese ID (FK constraint)' });
        }
        res.status(500).json({ error: 'Error interno al actualizar evento' });
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
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.status(500).json({ error: 'Error interno al eliminar evento' });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};
