import { PrismaClient } from "@prisma/client";
import { PrismaLogger } from "../plugins/PrismaLog.js";

// Inisialisasi Prisma Client
const DBConnection = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Aktifkan log Prisma
});

// Event listener untuk menangkap log Prisma
DBConnection.$on("query", (e) => {
    PrismaLogger.info({
        level: "query",
        message: e.query, // Query yang dijalankan
        params: e.params, // Parameter query
        duration: e.duration, // Durasi eksekusi
    });
});

DBConnection.$on("warn", (e) => {
    PrismaLogger.warn({ level: "warn", message: e.message });
});

DBConnection.$on("error", (e) => {
    PrismaLogger.error({ level: "error", message: e.message });
});

export { DBConnection };
