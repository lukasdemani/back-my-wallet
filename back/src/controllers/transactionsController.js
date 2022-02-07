import db from "../db.js";
import transactionSchema from "../schemas/transactionSchema.js";
import dayjs from "dayjs";

export async function registerTransaction(req, res) {
    const transaction = req.body;

    const validation = transactionSchema.validate(transaction);
        if (validation.error) {
        return res.sendStatus(422);
    }

    try {
        const transactionsCollection = db.collection("transactions");

        await transactionsCollection.insertOne({
        ...transaction,
        time: dayjs().format("DD/MM"),
        });

        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getTransactions(req, res) {
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    let totalAmount = 0;

    const usersCollection = db.collection("sessions");

    const user = await usersCollection.findOne({ token })
    const email = user.email;

    function calculateTotal(transactions){
        for (let i=0; i<transactions.length; i++){
            if (transactions[i].type === 'in'){
                totalAmount += parseInt(transactions[i].value)
            } else {
                totalAmount -= parseInt(transactions[i].value)
            }
        }
    }
  
    try {
      const transactionsCollection = db.collection("transactions");
  
      const transactions = await transactionsCollection.find({ email }).toArray();

    //   console.log(transactions);

      calculateTotal(transactions);
  
      res.send({ transactions, totalAmount });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
