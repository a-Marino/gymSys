import { ClassesCard } from '../../common/ClassesCard';
import useClassesStore from '../../../store/ClassesStore/ClassesStore';
import { useEffect } from 'react';
import { Spinner, Button } from '@nextui-org/react';
import { UserAuth } from '../../../context/AuthContext';
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../../common/Credenza';
import { Plus } from 'lucide-react';
import { Register } from './Register';

export const Classes = () => {
  const { classes, getClasses, isLoading } = useClassesStore();
  const { userData } = UserAuth();

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  return (
    <div className="min-h-[92vh] p-7 flex flex-col">
      <h1 className="text-4xl font-semibold">Classes</h1>
      {userData && userData.rol === 'admin' && (
        <Credenza>
          <CredenzaTrigger asChild>
            <Button color="primary" endContent={<Plus />} className="mt-10 w-[8rem]">
              Add New
            </Button>
          </CredenzaTrigger>
          <CredenzaContent className="md:min-w-[950px]">
            <CredenzaHeader>
              <CredenzaTitle className="mb-3">Add New Class</CredenzaTitle>
            </CredenzaHeader>
            <CredenzaBody>
              <Register />
            </CredenzaBody>
            <CredenzaFooter>
              <Button color="primary" type="submit" form="registerForm" CredenzaClose>
                Add
              </Button>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      )}
      {!isLoading ? (
        <div className="mt-10 flex flex-wrap gap-10">
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
