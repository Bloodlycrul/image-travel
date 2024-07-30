import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const gaurav = await prisma.user.upsert({
    where: { email: "gauravrana@gmail.com" },
    update: {},
    create: {
      email: "gauravrana@gmail.com",
      name: "gauravrana",
      password: "Gaurav@2001",
      image: "null",
    },
  });

  const saurav = await prisma.user.upsert({
    where: { email: "12sauravrana@gmail.com" },
    update: {},
    create: {
      email: "12sauravrana@gmail.com",
      password: "Gaurav@2001",
      name: "sauravrana",
      image: "null",
    },
  });
  console.log(saurav, gaurav);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
