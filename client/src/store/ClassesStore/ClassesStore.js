import { create } from 'zustand';
import { collection, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const useClassesStore = create((set) => ({
  classes: [],
  isLoading: true,

  getClasses: async () => {
    try {
      const classesSnapshot = await getDocs(collection(db, 'classes'));
      const classesArray = await Promise.all(
        classesSnapshot.docs.map(async (doc) => {
          const classData = doc.data();
          const professorRef = classData.professor;
          let professorData = {};

          if (professorRef) {
            const professorDoc = await getDoc(professorRef);
            professorData = professorDoc.data();
          }

          return {
            id: doc.id,
            ...classData,
            professor: professorData,
          };
        })
      );

      set({ isLoading: false });
      set({ classes: classesArray });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useClassesStore;
