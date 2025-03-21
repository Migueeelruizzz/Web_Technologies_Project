const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findAll() {
    return prisma.user.findMany();
}

async function findById(id) {
    return prisma.user.findUnique({ where: { id } });
}

async function create(data) {
    return prisma.user.create({ data });
}

async function update(id, data) {
    return prisma.user.update({ where: { id }, data });
}

async function remove(id) {
    return prisma.user.delete({ where: { id } });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
