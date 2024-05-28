import { createContext, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function createUser(email, password, name, rol) {
    axios
      .post('http://localhost:5000/api/user', {
        email: email,
        password: password,
        name: name,
        rol: rol,
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
    return data;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUserData(currentUser.uid).then((data) => {
          const userData = {
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
    <UserContext.Provider value={{ createUser, user, logout, login, error, isLoading, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
