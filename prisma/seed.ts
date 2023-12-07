import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const citiesNames = [
  "Port Said",
  "Ismailia",
  "Cairo",
  "Alexandria",
  "Mansoura",
  "Damietta",
  "Suez",
  "Asyut",
  "Sohag",
  "Luxor",
  "Hurghada",
  "Aswan",
  "Faiyum",
  "Beni Suef",
  "Arish",
];

const seedDb = async () => {
  await prisma.city.deleteMany();
  await prisma.city.createMany({
    data: citiesNames.map((cityName) => ({ name: cityName })),
  });
};

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
