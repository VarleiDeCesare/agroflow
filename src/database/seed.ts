import { PrismaClient } from '@prisma/client';
import data from './seedData';

const prisma = new PrismaClient();

async function main() {
  const users = Object.values(data.users).map(async (value) => {
    const { email } = value;
    return prisma.user.upsert({
      where: { email },
      update: value,
      create: value,
    });
  });

  await Promise.all([...users] as any);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
