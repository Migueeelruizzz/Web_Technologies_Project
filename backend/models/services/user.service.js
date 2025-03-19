const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAll() {
    return await prisma.usuario.findMany();
}

async function getById(id) {
    return await prisma.usuario.findUnique({ where: { id } });
}

async function create(data) {
    // Aquí podrías hashear la contraseña con bcrypt
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.usuario.create({
        data: {
            nombre: data.nombre,
            email: data.email,
            password: data.password, // o hashedPassword
        },
    });
}

async function update(id, data) {
    return await prisma.usuario.update({
        where: { id },
        data,
    });
}

async function remove(id) {
    return await prisma.usuario.delete({
        where: { id },
    });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
