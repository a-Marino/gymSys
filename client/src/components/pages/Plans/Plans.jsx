import { useEffect } from 'react';
import { Card, CardBody, Spinner, CardHeader, Divider, Button } from '@nextui-org/react';
import usePlansStore from '../../../store/plansStore/plansStore';
import { UserAuth } from '../../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Plans = () => {
  const { plans, getPlans, isLoading } = usePlansStore();
  const { changePlan, user } = UserAuth();

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  const handleClick = (planID) => {
    if (!user) {
      toast.error('You must be logged in', {
        position: 'bottom-right',
        autoClose: 3000,
        icon: false,
        theme: 'colored',
      });
    } else {
      changePlan(user.uid, planID);
      toast.success('Your plan has been updated', {
        position: 'bottom-right',
        autoClose: 3000,
        icon: false,
        theme: 'colored',
      });
    }
  };

  plans.sort(dynamicSort('price'));

  return !isLoading ? (
    <div className="flex flex-col items-center justify-center mt-16 gap-10 px-6">
      <h1 className="md:text-6xl text-5xl text-center font-medium text-white">
        Choose a <span className="italic text-primary font-semibold">plan</span> that fits <br />{' '}
        your needs
      </h1>
      <div className="flex lg:flex-row flex-col gap-5 mt-10 flex-shrink">
        {plans.map((item, index) => (
          <Card key={index} className="w-[350px] dark mb-10 p-2 border-3 border-primary">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-3xl">{item.name}</p>
                <p className="text-white/40 text-sm h-14">{item.description}</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col">
                <p className="text-3xl">${item.price}</p>
                <ul className="text-xs mt-1 gap-2 text-white/40">
                  <li>Paid Monthly</li>
                  <li>Pause or cancel at any time.</li>
                </ul>
                <Button
                  className="my-3"
                  color="primary"
                  variant="ghost"
                  onClick={() => handleClick(item.id)}
                >
                  Get {item.name}
                </Button>
              </div>
              <Divider />
              <div className="mt-5 flex flex-col mb-2">
                {item.benefits.map((item, index) => (
                  <ul key={index} className="list-disc px-5 marker:text-primary">
                    <li>{item}</li>
                  </ul>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <ToastContainer />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen -mt-16">
      <Spinner />
    </div>
  );
};
