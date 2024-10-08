import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import { Input, Button, Link } from '@nextui-org/react';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = function () {
  const { login } = UserAuth();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.code.split('auth/')[1]);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const emailChanged = sessionStorage.getItem('emailChanged');

    if (emailChanged) {
      toast.success('Your email has been changed', {
        position: 'bottom-right',
        autoClose: 2000,
        icon: false,
        className: 'bg-success text-white',
        hideProgressBar: true,
      });

      sessionStorage.removeItem('emailChanged');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-white h-screen gap-5 -mt-16">
      <div>
        <h1 className="text-3xl font-semibold">Sign In</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 dark md:w-[50%]"
      >
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          labelPlacement="inside"
          label="Email"
          className="mt-5"
          variant="bordered"
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
        {error && (
          <p className="mt-3 bg-red-300 md:w-[50%] mx-auto rounded-full py-1 text-red-700">
            {error}
          </p>
        )}
        <Button className="w-full" color="primary" type="submit">
          Sign In
        </Button>
      </form>
      <Link className=" text-muted-foreground cursor-pointer" href="/signup">
        Dont have an account? Sign Up
      </Link>
      <ToastContainer />
    </div>
  );
};
