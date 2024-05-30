import { useEffect } from 'react';
import { Card, CardBody, CardFooter, Spinner } from '@nextui-org/react';
import usePlansStore from '../../../store/plansStore/plansStore';

export const Plans = () => {
  const { plans, fetchPlans, isLoading } = usePlansStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return !isLoading ? (
    <div className="flex gap-2 justify-center mt-16">
      {plans.map((item, index) => (
        <Card key={index} isPressable className="min-w-[300px]">
          <CardBody className="overflow-visible p-0">
            <p className="w-full object-cover h-[140px] flex items-center  justify-center bg-gray-700 shadow-sm rounded-lg text-white font-bold text-4xl">
              {item.name}
            </p>
          </CardBody>
          <CardFooter className="flex flex-col">
            <b>{item.description}</b>
            <p>$ {item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-[90vh]">
      <Spinner />
    </div>
  );
};
