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
const auth = getAuth();

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

const getUserDetailsFromFirestore = async (uid) => {
  const userDoc = await db.collection('users').doc(uid).get();
  if (!userDoc.exists) {
    return null;
  }
  const userData = userDoc.data();

  let planData = {};
  if (userData.plan) {
    const planDoc = await userData.plan.get();
    if (planDoc.exists) {
      const planDocData = planDoc.data();
      planData = {
        id: planDoc.id,
        name: planDocData.name,
      };
    }
  }

  return {
    ...userData,
    plan: planData,
  };
};

app.get('/', (req, res) => {
  res.send('API running - Welcome to Andres Marino GYM API');
});

app.get('/api/users', jsonParser, async (req, res) => {
  try {
    const listAllUsers = async (nextPageToken) => {
      let users = [];
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      for (const userRecord of listUsersResult.users) {
        const userInfo = userRecord.toJSON();
        const additionalInfo = await getUserDetailsFromFirestore(userRecord.uid);
        users.push({
          uid: userInfo.uid,
          name: userInfo.name,
          email: userInfo.email,
          disabled: userInfo.disabled,
          ...additionalInfo,
        });
      }
      if (listUsersResult.pageToken) {
        users = users.concat(await listAllUsers(listUsersResult.pageToken));
      }
      return users;
    };

    const users = await listAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/user', jsonParser, async (req, res) => {
  const user = req.body;
  try {
    const userRecord = await auth.createUser({
      email: user.email,
      password: user.password,
      displayName: user.displayName,
    });

    await db.collection('users').doc(userRecord.uid).set({
      email: user.email,
      name: user.name,
      rol: user.rol,
      plan: null,
      avatarColors: user.avatarColors,
    });
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    res.send(err.message);
  }
});

app.put('/api/user/changeEmail', jsonParser, async (req, res) => {
  const user = req.body;
  try {
    const userRecord = await auth.updateUser(user.uid, {
      email: user.email,
    });

    await db.collection('users').doc(userRecord.uid).update({
      email: user.email,
    });

    res.status(200).json({ message: 'Email changed successfully.' });
  } catch (err) {
    res.send(err.message);
  }
});

app.put('/api/user/changePlan', jsonParser, async (req, res) => {
  const user = req.body;
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .update({
        plan: db.collection('plans').doc(user.planID),
      });

    res.status(200).json({ message: 'Your plan has been updated.' });
  } catch (err) {
    res.send(err.message);
  }
});

app.put('/api/user/changeStatus', jsonParser, async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).send({ message: 'User ID (uid) is required' });
  }

  try {
    const userRecord = await auth.getUser(uid);

    const newStatus = !userRecord.disabled;

    await auth.updateUser(uid, { disabled: newStatus });

    res.status(200).send({
      message: `User ${newStatus ? 'disabled' : 'enabled'} successfully`,
      uid,
      disabled: newStatus,
    });
  } catch (err) {
    res.send(err.message);
  }
});

app.put('/api/user/changeName', jsonParser, async (req, res) => {
  const user = req.body;
  try {
    await db.collection('users').doc(user.uid).update({
      name: user.name,
    });

    res.status(200).json({ message: 'Name changed successfully.' });
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server started at PORT 5000');
});
