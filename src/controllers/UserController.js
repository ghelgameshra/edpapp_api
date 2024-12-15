import { DBConnection } from "../database/Connection.js";
import bcryptjs from "bcryptjs";

const UserController = {
    async registerUser(request, reply) {
        const data = request.body;
        const prisma = DBConnection;

        const userExist = await prisma.user.findUnique({
            where: {
                nik: data.nik
            }
        });

        if(userExist){
            return reply.status(400).send({
                message: `NIK ${data.nik} Already Registered!`
            });
        }

        const password = await bcryptjs.hash(data.password, 10);

        try {
            
            const user = await prisma.user.create({
                data: {
                    name: data.name,
                    nik: data.nik.toString(),
                    password
                },
                select: {
                    name: true,
                    nik: true,
                },
            });

            return reply.code(201).send({
                message: 'success register',
                user: user
            });
        } catch (error) {
            return reply.code(400).send({
                error: error
            })
        }
    },
};

export default UserController;
