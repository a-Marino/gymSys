import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { Button } from '../../common/Button';
import { Spinner } from '@nextui-org/react';

export const Account = function () {
  const { userData, logout, isLoading } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return !isLoading ? (
    <div className="px-5 mt-20">
      <h1 className="text-3xl font-semibold">Account</h1>
      <div className="my-5 py-5 px-5 border rounded-md md:w-[50%] border-black flex flex-col gap-2">
        <p>
          Email: <span className="font-semibold">{userData.email}</span>
        </p>
        <p>Name: {userData.name}</p>
        <p>Rol: {userData.rol}</p>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  ) : (
    <div className="flex items-center justify-center h-[90vh]">
      <Spinner />
    </div>
  );
};
