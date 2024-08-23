import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { Input, Button, Link } from '@nextui-org/react';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export const SignUp = () => {
  const { userData, signup } = UserAuth();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup(email, name, password, dni, phone, address);
  };

  return !userData ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-10 text-5xl font-medium">Sign Up</h1>
      <form
        id="signupForm"
        name="signupForm"
        className="flex flex-col items-center justify-center w-[60%] gap-5"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="flex flex-col gap-5 w-full">
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
            <Input
              type="number"
              onChange={(e) => setDni(e.target.value)}
              label="DNI"
              labelPlacement="inside"
              variant="bordered"
              required
            />
            <Input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              labelPlacement="inside"
              variant="bordered"
              required
            />
            <PhoneInput
              onChange={(value) => setPhone(value)}
              placeholder="Enter phone number"
              defaultCountry="AR"
              className="[&_input]:bg-transparent [&_input]:p-3 [&_input]:border-2 [&_input]:border-default [&_input]:rounded-xl [&_select]:bg-content1 [&_select]:p-2 [&_select]:scrollbar-hide [&_select]:text-default-600 "
            />
            <Button color="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </div>
      </form>
      <Link className="mt-5 text-muted-foreground cursor-pointer" href="/login">
        Already have an account? Log In
      </Link>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
