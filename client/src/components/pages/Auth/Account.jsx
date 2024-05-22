import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { Button } from '../../common/Button';

export const Account = function () {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-5 mt-20">
      <h1 className="text-3xl font-semibold">Account</h1>
      <div className="my-5 py-5 px-5 border rounded-md w-[50%] border-black flex flex-col gap-2">
        <p>
          Email: <span className="font-semibold">{user.email}</span>
        </p>
        <p>Name: {user.name}</p>
        <p>Rol: {user.rol}</p>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
