import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

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
    <div>
      Account
      <h1>email: {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
