import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';

export const Register = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/account');
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign up</h1>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="underline">
            Sign in.
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
        <button>Sign Up</button>
      </form>
    </div>
  );
};
