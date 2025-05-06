const prisma = require('../prisma');

async function findAll() {
    return prisma.registration.findMany();
}

async function findById(id) {
    return prisma.registration.findUnique({ where: { id } });
}

async function create(data) {
    return prisma.registration.create({ data });
}

async function update(id, data) {
    return prisma.registration.update({ where: { id }, data });
}

async function remove(id) {
    return prisma.registration.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };