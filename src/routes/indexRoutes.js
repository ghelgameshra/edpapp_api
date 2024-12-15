const indexRoutes = async (fastify, options) => {
    fastify.get('/', (request, reply) => {
        return reply.send({
            "messages": "welcome to EDP-REG 4 API"
        });
    });
}

export {
    indexRoutes
}
