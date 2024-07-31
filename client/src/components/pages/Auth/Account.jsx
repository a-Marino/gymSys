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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '../../common/Sheet';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Account = function () {
  const { isLoading, setUser, changeUserData, user } = UserAuth();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [dni, setDni] = useState();
  const [phone, setPhone] = useState();
  const [open, setOpen] = useState();

  const handleEditProfile = async () => {
    try {
      changeUserData(user.uid, { name, email, address, dni, phone });
      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          name: name,
          email: email,
          address: address,
          phone: phone,
          dni: dni,
        };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        return updatedUser;
      });
      setOpen(false);
      toast.success('User updated successfully', {
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

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setAddress(user?.address || '');
    setPhone(user?.phone || '');
    setDni(user?.dni || '');
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
          </div>
        </div>
      </div>
      <Divider className="my-10" />
      <div className="flex w-full">
        <div>
          <h4 className="text-3xl font-semibold">Personal info</h4>
          <div className="flex flex-col gap-2 mt-5 [&_p]:font-semibold [&_p]:text-lg [&_span]:text-base [&_span]:font-normal [&_span]:text-default-400">
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Address: <span>{user.address}</span>
            </p>
            <p>
              DNI: <span>{user.dni}</span>
            </p>
            <p>
              Phone number: <span>{user.phone}</span>
            </p>
          </div>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="ml-auto" variant="bordered" color="primary" size="sm">
              Edit profile
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 my-5">
              <Input
                onChange={(e) => setName(e.target.value)}
                label="Name"
                labelPlacement="inside"
                variant="bordered"
                defaultValue={user?.name}
                required
              />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                description="IMPORTANT: If you change your email you'll be loged out, and you'll have to sing in again."
                type="email"
                label="Email"
                labelPlacement="inside"
                variant="bordered"
                defaultValue={user?.email}
                required
              />
              <Input
                onChange={(e) => setAddress(e.target.value)}
                label="Address"
                labelPlacement="inside"
                variant="bordered"
                defaultValue={user?.address}
                required
              />
              <Input
                onChange={(e) => setDni(e.target.value)}
                type="number"
                label="DNI"
                labelPlacement="inside"
                variant="bordered"
                defaultValue={user?.dni}
                required
              />
              <PhoneInput
                onChange={(value) => setPhone(value)}
                value={user?.phone}
                placeholder="Enter phone number"
                defaultCountry="AR"
                className="w-full [&_input]:bg-transparent [&_input]:p-3 [&_input]:border-2 [&_input]:border-default [&_input]:rounded-xl [&_select]:bg-content1 [&_select]:p-2 [&_select]:scrollbar-hide [&_select]:text-default-600 "
                required
              />
            </div>
            <SheetFooter>
              <Button color="primary" onClick={handleEditProfile}>
                Save
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <Divider className="my-10" />
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
