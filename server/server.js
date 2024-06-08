import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const app = express();

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const jsonParser = bodyParser.json();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/api', (req, res) => {
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
