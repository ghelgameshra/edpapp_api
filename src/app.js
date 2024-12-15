import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes.js';
import { indexRoutes } from './routes/indexRoutes.js';

const fastify = Fastify({
    logger: true
});

const startServer = async () => {
    dotenv.config();

    const CORS_ORIGIN = (process.env.CORS_HOST).split(',');
    
    await fastify.register(fastifyCors, {
        origin: CORS_ORIGIN, // Daftar origin yang diizinkan
        methods: ['GET', 'POST'], // Metode HTTP yang diizinkan
        allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
        credentials: true, // Mengizinkan pengiriman cookie dan kredensial
    });
    
    /* 
        Register all route here
    */
    const HOST = process.env.SERVER_HOST || 'localhost';
    const PORT = process.env.SERVER_PORT || 3000;
    const PREFIX = process.env.SERVER_PREFIX;

    await fastify.register(async (server) => {
        await server.register(userRoutes);
        await server.register(indexRoutes);
    }, { prefix: PREFIX });

    try {
        await fastify.listen({
            port: PORT,
            host: HOST
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

startServer();

export {
    fastify
}
