import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Button } from '../../common/Button';
import { Navigate } from 'react-router-dom';

export const Register = function () {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

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

  return userData.rol === 'admin' ? (
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
            required
          />
        </div>
        <div>
          <input
            type="email"
            className="border border-black w-[50%] my-5 rounded-full px-4 py-2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="border border-black w-[50%]  rounded-full px-4 py-2"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <select
            id="rol"
            name="rol"
            className="border border-black w-[50%] rounded-full px-4 py-2 mt-5"
            onChange={(e) => setRol(e.target.value)}
            defaultValue="admin"
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {error && (
          <p className="mt-3 bg-red-300 w-[50%] mx-auto rounded-full py-1 text-red-700 ">{error}</p>
        )}
        {success && (
          <p className="mt-3 bg-green-300 w-[50%] mx-auto rounded-full py-1 text-green-700 ">
            User created successfully
          </p>
        )}
        <Button className="w-[50%] mt-3 mb-2">Sign Up</Button>
      </form>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
