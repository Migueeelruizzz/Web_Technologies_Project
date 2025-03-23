const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findAll() {
    return prisma.event.findMany();
}

async function findById(id) {
    return prisma.event.findUnique({ where: { id } });
}

async function create(data) {
    // Ajusta los campos según tu modelo (title, date, etc.)
    return prisma.event.create({ data });
}

async function update(id, data) {
    return prisma.event.update({
        where: { id },
        data,
    });
}

async function remove(id) {
    return prisma.event.delete({ where: { id } });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
