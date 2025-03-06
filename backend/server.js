const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            email: 'example124123245@email.com',
            name: 'maquinos134',
            password: 'sarama432rrana',
        },
    });
            I

console.log('New user created:', newUser);

}

main()
.catch(e => {
            throw e

        })
            .finally(async () => {
                await prisma.$disconnect();
            });