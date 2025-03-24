// user.dto.js

/**
 * Verifica los campos necesarios para CREAR un usuario
 */
function createUserDto(body) {
    const { name, email, password, role } = body;

    if (!name) {
        throw new Error('Name is required');
    }
    if (!email) {
        throw new Error('Email is required');
    }
    if (!password) {
        throw new Error('Password is required');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

    return {
        name: body.name.trim(),
        email: body.email.trim(),
        password: body.password,
        role: body.role || 'USER', // o body.role si quieres permitirlo
    };
}

/**
 * Verifica los campos necesarios para ACTUALIZAR un usuario
 */
function updateUserDto(body) {
    const { name, email, password, role } = body;
    const updatedFields = {};

    if (name) {
        if (name.length < 3) {
            throw new Error('Name must be at least 3 characters');
        }
        updatedFields.name = name.trim();
    }

    if (email) {
        updatedFields.email = email.trim();
    }

    if (password) {
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        updatedFields.password = password;
    }

    // Si no se envió ningún campo, error
    if (Object.keys(updatedFields).length === 0) {
        throw new Error('No fields to update');
    }

    return updatedFields;
}

/**
 * (Opcional) DTO para formatear la respuesta de un usuario,
 * ocultando campos sensibles (por ejemplo, password).
 */
function userToResponseDto(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        // no devolvemos user.password
        role: user.role,
    };
}

module.exports = {
    createUserDto,
    updateUserDto,
    userToResponseDto,
};
