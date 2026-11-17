import prisma from "./database/prisma.js";

const donneurs = await prisma.donneur.findMany();

console.log(donneurs);

await prisma.$disconnect();