import { UserAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '../../common/Button';

export const Nav = () => {
  const { user } = UserAuth();

  return (
    <header className="flex flex-row items-center justify-between px-5 py-2 sticky top-0 ">
      <Link to="/" className="text-2xl font-bold ">
        GYM LOGO
      </Link>
      <ul className="md:flex hidden flex-row gap-5 -ml-20">
        <li>Plans</li>
        <li>About us</li>
        <li>Equimpent</li>
        <li>Contact us</li>
      </ul>
      {user ? (
        <Link to="/account">
          <Button>Profile</Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </header>
  );
};
