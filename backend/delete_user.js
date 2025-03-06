const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {
    const deletedUser = await prisma.user.delete({
        where: { id: 1 },  // Identifica al usuario a eliminar
    });
    console.log('Usuario eliminado:', deletedUser);
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });