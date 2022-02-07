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
  user.email = stripHtml(user.email).result.trim();

  try {
    const usersCollection = db.collection("users");

    const existingEmail = await usersCollection.findOne({ email: user.email })
    const passwordError = user.password !== user.passwordTest
    if (existingEmail || passwordError) {
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

    await db.collection('sessions').insertOne({ token, userId: user._id, email });
    const name = user.name;
    const emailResponse = user.email;
    console.log(emailResponse);
    const response = {token, name, emailResponse};
    res.send(response);
  } else {
    res.sendStatus(401);
  }
}