import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import validateUserSchemaMiddleware from '../middlewares/validateUserSchemaMiddleware.js'

const authRouter = Router();
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", validateUserSchemaMiddleware, signUp)

export default authRouter;

