import { Router } from 'express';
import { getTransactions, registerTransaction } from '../controllers/transactionsController.js';

const messageRouter = Router();

messageRouter.post('/transactions', registerTransaction);
messageRouter.get('/transactions', getTransactions);
export default messageRouter;