// backend/services/user.service.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findAll() {
    return prisma.users.findMany();
}

async function findById(id) {
    return prisma.users.findUnique({ where: { id } });
}

async function create(data) {
    // data = { name, email, password, role? }
    return prisma.users.create({
        data,
    });
}

async function update(id, data) {
    return prisma.users.update({
        where: { id },
        data,
    });
}

async function remove(id) {
    return prisma.user.delete({
        where: { id },
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
