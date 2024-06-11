import { UserAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import {
  Spinner,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Button,
  Divider,
  Link,
  Input,
} from '@nextui-org/react';
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../../common/Credenza';
import { Pencil, CircleAlert } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Account = function () {
  const { userData, isLoading, updateName, changeEmail, logout } = UserAuth();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleChangeName = async () => {
    try {
      if (!name) return;
      await updateName(userData.uid, name).then(() => {
        sessionStorage.setItem('nameChanged', 'true');
        window.location.reload();
      });
    } catch {
      console.log('error');
    }
  };

  const handleChangeEmail = async () => {
    if (!email) return;
    if (email === userData.email) return;
    await changeEmail(userData.uid, email).then(() => {
      sessionStorage.setItem('emailChanged', 'true');
      logout();
    });
  };

  useEffect(() => {
    const nameChanged = sessionStorage.getItem('nameChanged');

    if (nameChanged) {
      toast.success('Your name has been changed', {
        position: 'bottom-right',
        autoClose: 2000,
        icon: false,
        theme: 'colored',
      });

      sessionStorage.removeItem('nameChanged');
    }
  }, []);

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
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">{userData.name}</p>
            <Credenza>
              <CredenzaTrigger asChild>
                <Pencil
                  size={25}
                  className="border-2 rounded-md p-1 hover:border-primary hover:text-primary transition-colors duration-150"
                />
              </CredenzaTrigger>
              <CredenzaContent>
                <CredenzaHeader>
                  <CredenzaTitle>Change name</CredenzaTitle>
                  <CredenzaDescription>You can change your name here</CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                  <Input
                    autoFocus
                    type="text"
                    label="Name"
                    labelPlacement="inside"
                    variant="bordered"
                    defaultValue={userData.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </CredenzaBody>
                <CredenzaFooter>
                  <CredenzaClose asChild>
                    <Button color="primary" onClick={handleChangeName}>
                      Save
                    </Button>
                  </CredenzaClose>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-lg text-white/70">{userData.email}</p>
            <Credenza>
              <CredenzaTrigger asChild>
                <Pencil
                  size={25}
                  className="border-2 rounded-md p-1 hover:border-primary hover:text-primary transition-colors duration-150"
                />
              </CredenzaTrigger>
              <CredenzaContent>
                <CredenzaHeader>
                  <CredenzaTitle className="mb-2">Change email</CredenzaTitle>
                  <CredenzaDescription className="flex gap-3 items-center bg-danger/10 p-2 rounded-lg text-danger">
                    <CircleAlert size={40} />
                    <span>
                      <span className="font-bold">IMPORTANT:</span> If you change your email
                      you&apos;ll be loged out, and you&apos;ll have to sing in again.
                    </span>
                  </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                  <Input
                    autoFocus
                    type="email"
                    label="Email"
                    labelPlacement="inside"
                    variant="bordered"
                    defaultValue={userData.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CredenzaBody>
                <CredenzaFooter>
                  <CredenzaClose asChild>
                    <Button color="primary" onClick={handleChangeEmail}>
                      Save
                    </Button>
                  </CredenzaClose>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>
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
      <ToastContainer closeButton={false} />
    </div>
  ) : (
    <div className="flex items-center justify-center h-[90vh]">
      <Spinner />
    </div>
  );
};
