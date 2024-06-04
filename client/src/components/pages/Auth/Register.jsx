import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';

export const Register = function () {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { createUser, error, userData } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, name, rol);
      if (error != undefined) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
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

        {error && (
          <p className="mt-3 bg-red-300  mx-auto rounded-full py-1 text-red-700 ">{error}</p>
        )}
        {success && (
          <p className="mt-3 bg-green-300  mx-auto rounded-full py-1 text-green-700 ">
            User created successfully
          </p>
        )}
        <Button className="mt-3 mb-2 w-full" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
