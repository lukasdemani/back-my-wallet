import { Router } from 'express';
import transactionsRouter from "./transactionsRouter.js";
import authRouter from './authRouter.js';

const router = Router();
router.use(authRouter);
router.use(transactionsRouter);

export default router;