import prisma from "./database/prisma.js";
const dons = await prisma.don.findMany({
    where: {
        donneurId: 1
    }
});
// console.log(dons)
const donneur = await prisma.donneur.findUnique({
    where: {
        id: 1
    },
    include: {
        dons: true
    }
});
// console.log(donneur)
//recherche par groupe sanguin 
const dons1 = await prisma.don.findMany({
    where: {
        donneur: {
            groupeSanguin: "A+"
        }
    },
    include: {
        donneur: true,
        centre: true
    }
});
// console.log(dons1);

// recherche par centre
const dons2 = await prisma.don.findMany({
    where :{
        // centreId : 1
        centre:{
            ville : "Sousse"
        }
    },
    include : {
        donneur : true,
        centre:true
    }
});
// console.log(dons2)
//trier les dons
const dons3 = await prisma.don.findMany({
    orderBy : {
        // dateDon : "desc"
        volume : "asc"
    }
})
// console.log(dons3)

//combinaison , filtrage et tri    
const dons4 = await prisma.don.findMany({
    where: {
    donneur: {
        groupeSanguin: "A+"
    },
    centre: {
        ville: "Sousse"
    }
},
    orderBy:{
        dateDon : "desc"
    },
    include: {
        donneur: true,
        centre: true
    }
});
// console.log(dons4)
const dons5 = await prisma.don.findMany({
    skip: 5,
    take: 10
});
console.log(dons5);