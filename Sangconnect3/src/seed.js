import prisma from "./database/prisma.js";

async function main() {
  const centres = [
    {
      nom: "Centre régional de Sousse",
      ville: "Sousse"
    },
    {
      nom: "Centre régional de Tunis",
      ville: "Tunis"
    },
    {
      nom: "Centre régional de Sfax",
      ville: "Sfax"
    }
  ];

  for (const centre of centres) {
    const existing = await prisma.centre.findFirst({
      where: { nom: centre.nom }
    });

    if (!existing) {
      await prisma.centre.create({
        data: centre
      });
    }
  }

  console.log("Les centres ont été ajoutés !");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });