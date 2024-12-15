import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const prismaPlugin = async (fastify, options) => {
    fastify.decorate('prisma', prisma);
}

export {
    prismaPlugin
}
