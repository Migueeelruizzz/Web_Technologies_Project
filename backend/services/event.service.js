const prisma = require('../prisma');

async function findAll() {
    return prisma.event.findMany();
}

async function findById(id) {
    return prisma.event.findUnique({ where: { id } });
}

async function create(data) {
    return prisma.event.create({ data });
}

async function update(id, data) {
    return prisma.event.update({ where: { id }, data });
}

async function remove(id) {
    return prisma.event.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };