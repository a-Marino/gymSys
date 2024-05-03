import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { useState } from 'react';

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
      setError(err.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign In</h1>
        <p>
          Dont have an account yet?{' '}
          <Link to="/register" className="underline">
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" className="border" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" className="border" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button>Sign In</button>
      </form>
    </div>
  );
};
