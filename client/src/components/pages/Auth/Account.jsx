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
  const { isLoading, updateName, changeEmail, logout, setUser, user } = UserAuth();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleChangeName = async () => {
    try {
      if (!name) return;
      const res = await updateName(user.uid, name);
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, name: name };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        return updatedUser;
      });
      toast(res.message, {
        position: 'bottom-right',
        autoClose: 2000,
        icon: false,
        className: 'bg-success text-white',
        hideProgressBar: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeEmail = async () => {
    if (!email) return;
    if (email === user.email) return;
    await changeEmail(user.uid, email).then(() => {
      sessionStorage.setItem('emailChanged', 'true');
      logout();
    });
  };

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  return !isLoading ? (
    <div className="px-5 mt-14 min-h-screen">
      <h1 className="text-4xl font-semibold ">Account</h1>
      <div className="mt-6 flex md:items-center gap-10 md:flex-row flex-col">
        <Avatar
          name={user.name}
          className="h-32 w-32 text-2xl"
          isBordered
          style={
            user.avatarColors
              ? {
                  background: `linear-gradient(to right, ${user.avatarColors[0]}, ${user.avatarColors[1]})`,
                }
              : { background: 'gold' }
          }
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">{user.name}</p>
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
                    type="text"
                    label="Name"
                    labelPlacement="inside"
                    variant="bordered"
                    defaultValue={user.name}
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
            <p className="text-lg text-white/70">{user.email}</p>
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
                    type="email"
                    label="Email"
                    labelPlacement="inside"
                    variant="bordered"
                    defaultValue={user.email}
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
      {user.plan && (
        <div className="flex flex-col">
          <h4 className="text-3xl font-semibold">Plan</h4>
          <Card className="w-[350px] dark mb-10 p-2 mt-10">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-3xl">{user.plan.name}</p>
                <p className="text-white/30 text-sm h-14">{user.plan.description}</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col">
                <p className="text-3xl">${user.plan.price}</p>
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
                {user.plan.benefits.map((item, index) => (
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
