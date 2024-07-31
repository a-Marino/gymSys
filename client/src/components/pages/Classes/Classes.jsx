import { ClassesCard } from '../../common/ClassesCard';
import useClassesStore from '../../../store/ClassesStore/ClassesStore';
import { useEffect } from 'react';
import { Spinner } from '@nextui-org/react';

export const Classes = () => {
  const { classes, getClasses, isLoading } = useClassesStore();

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  return (
    <div className="min-h-[92vh] p-7 flex flex-col">
      <h1 className="text-5xl font-semibold">Classes</h1>
      {!isLoading ? (
        <div className="mt-5 flex flex-wrap gap-10">
          {classes.map((item, index) => (
            <div key={index}>
              <ClassesCard
                name={item.name}
                address={item.address}
                hour={item.hour}
                days={item.days}
                professor={item.professor}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[70vh]">
          <Spinner />
        </div>
      )}
    </div>
  );
};
