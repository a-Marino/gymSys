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

  const color1 = randomColor();
  const color2 = randomColor();

  async function createUser(email, password, name, rol, dni, phone, address) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_GYM_API_URL}/api/user`, {
        email: email,
        password: password,
        name: name,
        rol: rol,
        avatarColors: [color1, color2],
        dni: dni,
        phone: phone,
        address: address,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  const editUser = async (uid, email, name, rol, dni, phone, address) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user`, {
        uid: uid,
        email: email,
        name: name,
        rol: rol,
        dni: dni,
        phone: phone,
        address: address,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const changeUserStatus = async (userID) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changeStatus`, {
        uid: userID,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const changePlan = async (userID, planID) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changePlan`, {
        uid: userID,
        planID: planID,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateName = async (userID, name) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changeName`, {
        uid: userID,
        name: name,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const changeEmail = async (userId, email) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changeEmail`, {
        uid: userId,
        email: email,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const data = await getUserData(currentUser.uid);
        const userData = { uid: currentUser.uid, ...data };
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        localStorage.clear();
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userDataStorage = localStorage.getItem('userData');
  const userData = JSON.parse(userDataStorage);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        login,
        isLoading,
        userData,
        changePlan,
        updateName,
        changeEmail,
        setUser,
        changeUserStatus,
        editUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
