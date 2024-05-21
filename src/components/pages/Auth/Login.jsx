import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import { Button } from '../../common/Button';

export const Login = function () {
  const { login } = UserAuth();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/account');
    } catch (err) {
      setError(err.code.split('auth/')[1]);
    }
  };

  return (
    <div className="px-5 text-center mt-20">
      <div>
        <h1 className="text-3xl font-bold">Sign In</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
        <Button className="w-[50%] mt-5 mb-2">Sign In</Button>
      </form>
    </div>
  );
};
