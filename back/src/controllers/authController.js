import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';
import dayjs from 'dayjs';
import { stripHtml } from "string-strip-html";
import userSchema from '../schemas/userSchema.js';

export async function signUp(req, res) {
  const user = req.body;

  console.log(user)

  user.name = stripHtml(user.name).result.trim();

  try {
    const usersCollection = db.collection("users");
    // const messagesCollection = db.collection("messages");

    const existingUser = await usersCollection.findOne({ name: user.name });
    if (existingUser) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await usersCollection.insertOne({
      ...user,
      password: passwordHash,
      lastStatus: Date.now()
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    await db.collection('sessions').insertOne({ token, userId: user._id });
    const name = user.name;
    const response = {token, name};
    res.send(response);
  } else {
    res.sendStatus(401);
  }
}