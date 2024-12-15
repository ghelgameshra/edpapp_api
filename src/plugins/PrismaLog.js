import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

// Mengambil direktori file saat ini menggunakan import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Pastikan direktori 'log' ada, jika tidak, buatlah
const logDir = path.join(__dirname, "../log");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const PrismaLogger = createLogger({
    level: "warn", // Level log (info, warn, error)
    format: format.combine(
        format.timestamp(), // Tambahkan timestamp ke setiap log
        format.json()       // Simpan dalam format JSON
    ),
    transports: [
        new transports.File({ filename: path.join(logDir, "prisma.log") }),
    ],
});

export { PrismaLogger };
