import { createContext, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import randomColor from 'randomcolor';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const color1 = randomColor();
  const color2 = randomColor();

  async function createUser(email, password, name, rol) {
    axios
      .post('http://localhost:5000/api/user', {
        email: email,
        password: password,
        name: name,
        rol: rol,
        avatarColors: [color1, color2],
      })
      .then((res) => {
        setError(res.data);
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const changePlan = async (userId, planID) => {
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      plan: doc(db, `plans/${planID}`),
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  async function getUserData(uid) {
    const docRef = doc(db, `users/${uid}`);
    const docCifrada = await getDoc(docRef);
    const data = docCifrada.data();
    if (data && data.plan) {
      try {
        const planDocRef = data.plan;
        const planDocSnap = await getDoc(planDocRef);
        if (planDocSnap.exists()) {
          data.plan = planDocSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching plan data: ', error);
      }
    }
    return data;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUserData(currentUser.uid).then((data) => {
          const userData = {
            uid: currentUser.uid,
            ...data,
          };
          setIsLoading(false);
          localStorage.setItem('userData', JSON.stringify(userData));
          setUser(userData);
        });
      } else {
        localStorage.clear();
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userDataStorage = localStorage.getItem('userData');
  const userData = JSON.parse(userDataStorage);

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, login, error, isLoading, userData, changePlan }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
