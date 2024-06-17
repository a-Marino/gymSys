import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = function () {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { createUser, userData } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUser(email, password, name, rol);
      if (res && res.message) {
        toast.success(res.message, {
          position: 'bottom-right',
          autoClose: 2000,
          icon: false,
          className: 'bg-success text-white',
          hideProgressBar: true,
        });
      }
      toast.error(res, {
        position: 'bottom-right',
        autoClose: 2000,
        icon: false,
        theme: 'colored',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return userData && userData.rol === 'admin' ? (
    <div className="flex flex-col items-center justify-center text-white min-h-screen w-full dark gap-5">
      <div>
        <h1 className="text-3xl font-bold">Sign up</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 w-[60%]"
      >
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          label="Name"
          labelPlacement="inside"
          variant="bordered"
          required
        />
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          labelPlacement="inside"
          variant="bordered"
          required
        />
        <Input
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          variant="bordered"
        />
        <Select
          id="rol"
          name="rol"
          onChange={(e) => setRol(e.target.value)}
          label="Select a Role"
          className="dark"
          variant="bordered"
          required
        >
          <SelectItem value="admin" key="admin">
            Admin
          </SelectItem>
          <SelectItem value="user" key="user">
            User
          </SelectItem>
        </Select>
        <Button className="mt-3 mb-2 w-full" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
      <ToastContainer />
    </div>
  ) : (
    <Navigate to="/" />
  );
};
