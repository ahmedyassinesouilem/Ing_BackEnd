import prisma from "./database/prisma.js";

// async function main() {
//     await prisma.don.create({
//         data: {
//             volume: 450,
//             donneurId: 1,
//             centreId: 1
//         }
//     });

//     await prisma.don.create({
//         data: {
//             volume: 450,
//             donneurId: 1,
//             centreId: 2
//         }
//     });

//     await prisma.don.create({
//         data: {
//             volume: 500,
//             donneurId: 2,
//             centreId: 1
//         }
//     });

//     console.log("Les dons ont été ajoutés avec succès !");
// }

// main()
//     .catch((error) => {
//         console.error("Erreur :", error);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

// const dons = await prisma.don.findMany();

// const dons = await prisma.don.findMany({
//     include: {
//         donneur: true,
//         centre: true
//     }
// });

   const dons = await prisma.don.findMany({
    select: {
        id: true,
        dateDon: true,
        volume: true,

        donneur: {
            select: {
                nom: true,
                prenom: true,
                groupeSanguin: true
            }
        },

        centre: {
            select: {
                nom: true,
                ville: true
            }
        }
    }
});

console.log(dons);