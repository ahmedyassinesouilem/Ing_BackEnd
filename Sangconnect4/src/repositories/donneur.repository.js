import prisma from "../database/prisma.js";

export function findAll() {
    return prisma.donneur.findMany();
}

export function findById(id) {
    return prisma.donneur.findUnique({
        where: {
            id: id
        }
    });
}

export function create(data) {
    return prisma.donneur.create({
        data: data
    });
}

export function update(id, data) {
    return prisma.donneur.update({
        where: {
            id: id
        },
        data: data
    });
}

export function remove(id) {
    return prisma.donneur.delete({
        where: {
            id: id
        }
    });
}