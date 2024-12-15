import UserController from "../controllers/UserController.js";
import { RegisterValidation } from "../validation/UserValidate.js";

const userRoutes = async (fastify, options) => {
    fastify.post('/register', {
        schema: {
            body: RegisterValidation,
        },
    }, UserController.registerUser);
}

export {
    userRoutes
}
