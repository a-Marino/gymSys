import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Button } from '../../common/Button';

export const Register = function () {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { createUser, updateUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      await updateUser(name);
      navigate('/account');
    } catch (err) {
      setError(err.code.split('auth/')[1]);
    }
  };

  return (
    <div className="px-5 text-center mt-20">
      <div>
        <h1 className="text-3xl font-bold">Sign up</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="border border-black w-[50%] mt-5 rounded-full px-4 py-2"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            type="email"
            className="border border-black w-[50%] my-5 rounded-full px-4 py-2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            className="border border-black w-[50%]  rounded-full px-4 py-2"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {error && (
          <p className="mt-3 bg-red-300 w-[50%] mx-auto rounded-full py-1 text-red-700">{error}</p>
        )}
        <Button className="w-[50%] mt-3 mb-2">Sign Up</Button>
      </form>
      <p>
        Already have an account?
        <Link to="/login" className="ml-1 font-semibold hover:underline">
          Sign in.
        </Link>
      </p>
    </div>
  );
};
