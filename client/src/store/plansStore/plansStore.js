import { create } from 'zustand';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const usePlansStore = create((set) => ({
  plans: [],
  isLoading: true,

  getPlans: async () => {
    try {
      const planesSnapshot = await getDocs(collection(db, 'plans'));
      const planesArray = planesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ isLoading: false });
      set({ plans: planesArray });
    } catch (err) {
      console.log(err);
    }
  },

  // more functions
}));

export default usePlansStore;
