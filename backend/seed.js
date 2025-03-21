const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.usuario.create({
        data: {
            email: 'exampafdle5@email.com',
            nombre: 'maafds134',
            password: 'saraafrana',
        },
    });
    console.log('New user created:', newUser);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
