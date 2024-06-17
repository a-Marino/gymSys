import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

const app = express();

const { privateKey } = JSON.parse(process.env.PRIVATE_KEY);

initializeApp({
  credential: cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: privateKey,
  }),
});
const db = getFirestore();

const jsonParser = bodyParser.json();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://gym-sys.vercel.app',
      'https://gym-server-flax.vercel.app',
    ],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('API running');
});

app.post('/api/user', jsonParser, async (req, res) => {
  const user = req.body;
  await getAuth()
    .createUser({
      email: user.email,
      password: user.password,
      displayName: user.name,
    })
    .then((UserRecord) => {
      db.collection('users').doc(UserRecord.uid).set({
        email: user.email,
        name: user.name,
        rol: user.rol,
        plan: null,
        avatarColors: user.avatarColors,
      });
      res.status(200).json({ message: 'User created successfully' });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.post('/api/user/changeEmail', jsonParser, async (req, res) => {
  const user = req.body;
  await getAuth()
    .updateUser(user.uid, {
      email: user.email,
    })
    .then((UserRecord) => {
      db.collection('users').doc(UserRecord.uid).update({
        email: user.email,
      });
      res.status(200).json({ message: 'Email changed successfully' });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.listen(5000, () => {
  console.log('Server started at PORT 5000');
});
