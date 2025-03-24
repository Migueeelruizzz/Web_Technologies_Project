// event.dto.js

function createEventDto(body) {
    const { title, description, date, location, organizerId } = body;

    if (!title) throw new Error('Title is required');
    if (!description) throw new Error('Description is required');
    if (!date) throw new Error('Date is required');
    if (!location) throw new Error('Location is required');
    if (!organizerId) throw new Error('OrganizerId is required');

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
    }

    return {
        title: title.trim(),
        description: description.trim(),
        date: parsedDate,
        location: location.trim(),
        organizerId: Number(organizerId),
    };
}

function updateEventDto(body) {
    const updatedFields = {};
    const { title, description, date, location, organizerId } = body;

    if (title) {
        updatedFields.title = title.trim();
    }
    if (description) {
        updatedFields.description = description.trim();
    }
    if (date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format');
        }
        updatedFields.date = parsedDate;
    }
    if (location) {
        updatedFields.location = location.trim();
    }
    if (organizerId) {
        updatedFields.organizerId = Number(organizerId);
    }

    if (Object.keys(updatedFields).length === 0) {
        throw new Error('No fields to update');
    }

    return updatedFields;
}

function eventToResponseDto(event) {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        organizerId: event.organizerId,
    };
}

module.exports = {
    createEventDto,
    updateEventDto,
    eventToResponseDto,
};
