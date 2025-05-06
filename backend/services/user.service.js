

const prisma = require('../prisma');

async function findAll() {
  // Usar prisma.users
  return prisma.users.findMany();
}

async function findById(id) {
  return prisma.users.findUnique({ where: { id } });
}

async function create(data) {
  return prisma.users.create({ data });
}

async function update(id, data) {
  return prisma.users.update({ where: { id }, data });
}

async function remove(id) {
  return prisma.users.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };