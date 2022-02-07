// import express from 'express';
// import { signUp, signIn } from './controllers/authController.js';
// import { deleteUser, getUser, updateUser } from './controllers/userController.js';
// import { registerTransaction, getTransactions } from './controllers/transactionsController.js';

// const app = express();
// app.use(express.json());

// app.post("/sign-up", signUp);

// app.post("/sign-in", signIn);

// app.get("/user", getUser);

// app.put("/user", updateUser);

// app.delete("/user", deleteUser);

// app.post("/transaction")

import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(json());

app.use(router);

app.listen(5000, () => {
  console.log("Listening on 5000")
})