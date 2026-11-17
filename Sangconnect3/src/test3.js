const dons = await prisma.don.findMany();

console.log(dons);