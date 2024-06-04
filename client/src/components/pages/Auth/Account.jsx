// import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import {
  Spinner,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Button,
  Divider,
  Link,
} from '@nextui-org/react';

export const Account = function () {
  const { userData, isLoading } = UserAuth();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate('/');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return !isLoading ? (
    <div className="px-5 mt-14 min-h-screen ">
      <h1 className="text-4xl font-semibold ml-2">Account</h1>
      <div className="mt-6 flex items-center gap-10">
        <Avatar
          name={userData.name}
          className="h-32 w-32 text-2xl"
          isBordered
          style={
            userData.avatarColors
              ? {
                  background: `linear-gradient(to right, ${userData.avatarColors[0]}, ${userData.avatarColors[1]})`,
                }
              : { background: 'gold' }
          }
        />
        <div>
          <p className="text-2xl font-bold">{userData.name}</p>
          <p className="text-lg text-white/70">{userData.email}</p>
        </div>
      </div>
      <Divider className="my-10 dark" />
      {userData.plan && (
        <div className="flex flex-col">
          <h4 className="text-3xl font-semibold">Plan</h4>
          <Card className="w-[350px] dark mb-10 p-2 mt-10">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-3xl">{userData.plan.name}</p>
                <p className="text-white/30 text-sm h-14">{userData.plan.description}</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col">
                <p className="text-3xl">${userData.plan.price}</p>
                <ul className="text-xs mt-1 gap-2 text-white/70">
                  <li>Paid Monthly</li>
                  <li>Pause or cancel at any time.</li>
                </ul>
                <Button className="my-3" color="primary" variant="ghost" as={Link} href="/plans">
                  Change Plan
                </Button>
              </div>
              <Divider />
              <div className="mt-5 flex flex-col mb-2">
                {userData.plan.benefits.map((item, index) => (
                  <ul key={index} className="list-disc px-5">
                    <li>{item}</li>
                  </ul>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center h-[90vh]">
      <Spinner />
    </div>
  );
};
