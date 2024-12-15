import { fastify } from "../app.js";
import { DBConnection } from "../database/Connection.js";

beforeAll(async () => {
    await fastify.ready();
    await DBConnection.user.deleteMany(); // Pastikan data pengguna dibersihkan sebelum tes
});

afterAll(async () => {
    await fastify.close();
});

describe('POST /api/v1/register', () => {
    const validPayload = {
        name: "Rizky andriawan",
        nik: "2015451256",
        password: "gh3lgameshra"
    };

    const invalidPayload = {
        name: "",
        nik: "",
        password: ""
    };

    it('Should Success Register', async () => {
        const options = {
            method: "POST",
            url: "/api/v1/register",
            payload: validPayload
        };

        const response = await fastify.inject(options);
        const responseBody = response.json(); // Menggunakan response.json() untuk parsing otomatis

        expect(response.statusCode).toBe(201);
        expect(responseBody.message).toBe("Success Register");
        expect(responseBody.user.name).toBe("RIZKY ANDRIAWAN");
        expect(responseBody.user.nik).toBe("2015451256");
    });

    it('Should Failed Register (Empty Fields)', async () => {
        const options = {
            method: "POST",
            url: "/api/v1/register",
            payload: invalidPayload
        };

        const response = await fastify.inject(options);
        const responseBody = response.json(); // Parsing response body untuk error message

        expect(response.statusCode).toBe(400);
        expect(responseBody.message).toBeDefined();
    });

    it('Should Already Register', async () => {
        // Pertama kali daftar dengan data yang sama
        await fastify.inject({
            method: "POST",
            url: "/api/v1/register",
            payload: validPayload
        });

        // Coba daftar lagi dengan data yang sama
        const response = await fastify.inject({
            method: "POST",
            url: "/api/v1/register",
            payload: validPayload
        });
        const responseBody = response.json(); // Parsing response body

        expect(response.statusCode).toBe(400);
        expect(responseBody.message).toBe('NIK 2015451256 Already Registered!'); // Atau sesuaikan dengan pesan error yang diharapkan
    });
});
