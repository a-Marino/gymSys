import { createContext, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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

  const signup = async (email, name, password, dni, phone, address) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        name: name,
        dni: dni,
        phone: phone,
        address: address,
        rol: 'member',
        avatarColors: [color1, color2],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

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

  const changeUserData = async (userId, { name, email, address, phone, dni }) => {
    try {
      if ({ name } && name !== userData.name) {
        try {
          const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changeName`, {
            uid: userId,
            name: name,
          });
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }
      if ({ email } && email !== userData.email) {
        try {
          const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changeEmail`, {
            uid: userId,
            email: email,
          });
          logout();
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }
      if ({ address } && address !== userData.address) {
        try {
          const res = await axios.put(
            `${import.meta.env.VITE_GYM_API_URL}/api/user/changeAddress`,
            {
              uid: userId,
              address: address,
            }
          );
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }
      if ({ phone } && phone !== userData.phone) {
        try {
          const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changePhone`, {
            uid: userId,
            phone: phone,
          });
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }
      if ({ dni } && dni !== userData.dni) {
        try {
          const res = await axios.put(`${import.meta.env.VITE_GYM_API_URL}/api/user/changeDni`, {
            uid: userId,
            dni: dni,
          });
          return res.data;
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
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
        login,
        logout,
        changePlan,
        changeUserStatus,
        editUser,
        changeUserData,
        user,
        isLoading,
        userData,
        setUser,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
