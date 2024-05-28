import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import { Button } from '../../common/Button';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';

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

  return (
    <div className="md:px-5 text-center mt-20 w-full">
      <div>
        <h1 className="text-3xl font-bold">Sign In</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mx-auto max-w-[60vw] gap-5"
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
        <Button className="w-full mt-5 mb-2">Sign In</Button>
      </form>
    </div>
  );
};
