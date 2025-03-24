const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Crear un usuario admin
    const adminUser = await prisma.user.create({
        data: {
            name: 'Admin Master',
            email: 'admin@example.com',
            password: 'adminpass', // en prod, encripta con bcrypt
            role: 'ADMIN',         // <--- Asignas el rol
        },
    });
    console.log('Admin user created:', adminUser);

    // Crear un usuario normal
    const normalUser = await prisma.user.create({
        data: {
            name: 'User Normal',
            email: 'user@example.com',
            password: 'userpass',
            role: 'USER',          // <--- Asignas el rol
        },
    });
    console.log('Normal user created:', normalUser);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
