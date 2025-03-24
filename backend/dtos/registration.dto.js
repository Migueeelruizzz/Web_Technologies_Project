// registration.dto.js

function createRegistrationDto(body) {
    const { userId, eventId } = body;
    if (!userId) throw new Error('userId is required');
    if (!eventId) throw new Error('eventId is required');

    return {
        userId: Number(userId),
        eventId: Number(eventId),
    };
}

function updateRegistrationDto(body) {
    const updatedFields = {};
    const { userId, eventId } = body;

    if (userId) {
        updatedFields.userId = Number(userId);
    }
    if (eventId) {
        updatedFields.eventId = Number(eventId);
    }

    if (Object.keys(updatedFields).length === 0) {
        throw new Error('No fields to update');
    }

    return updatedFields;
}

function registrationToResponseDto(reg) {
    return {
        id: reg.id,
        userId: reg.userId,
        eventId: reg.eventId,
    };
}

module.exports = {
    createRegistrationDto,
    updateRegistrationDto,
    registrationToResponseDto,
};
