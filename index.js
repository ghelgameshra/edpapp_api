import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();
const fastify = Fastify({
    logger: true
})

const CORS_ORIGIN = (process.env.CORS_HOST).split(',');

await fastify.register(fastifyCors, {
    origin: CORS_ORIGIN, // Daftar origin yang diizinkan
    methods: ['GET', 'POST'], // Metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
    credentials: true, // Mengizinkan pengiriman cookie dan kredensial
});

// Declare a route
fastify.get('/', async function handler(request, reply) {
    reply.send({
        'messages': 'ok'
    })
})

const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 3000;

const start = async () => {
    try {
        await fastify.listen({
            port: PORT,
            host: HOST
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
