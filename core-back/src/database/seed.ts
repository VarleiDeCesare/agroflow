import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import data from './seedData';

const prisma = new PrismaClient();

async function main() {
  const users = Object.values(data.users).map(async (value) => {
    const { email } = value;
    return prisma.user.upsert({
      where: { email },
      update: { password: await hash(value.password, 8) },
      create: { ...value, password: await hash(value.password, 8) },
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
