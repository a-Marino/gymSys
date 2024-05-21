import { UserAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '../../common/Button';
import { motion } from 'framer-motion';

export const Nav = () => {
  const { user } = UserAuth();

  return (
    <header className="sticky top-3">
      <nav className="flex flex-row px-5 py-2 bg-black/80 text-white rounded-full m-3 justify-between items-center backdrop-blur-md">
        <Link to="/" className="text-2xl font-bold">
          GYM LOGO
        </Link>
        <div className="hidden md:flex items-center space-x-5">
          <ul className="flex flex-row gap-5">
            <motion.li className="cursor-pointer " whileHover={{ scale: 1.05 }}>
              Plans
            </motion.li>
            <motion.li className="cursor-pointer " whileHover={{ scale: 1.05 }}>
              About us
            </motion.li>
            <motion.li className="cursor-pointer " whileHover={{ scale: 1.05 }}>
              Equimpent
            </motion.li>
            <motion.li className="cursor-pointer " whileHover={{ scale: 1.05 }}>
              Contact us
            </motion.li>
            {user && (
              <motion.li className="cursor-pointer " whileHover={{ scale: 1.05 }}>
                Classes
              </motion.li>
            )}
            {user && user.rol === 'admin' && (
              <Link className="cursor-pointer " to="/register">
                Add User
              </Link>
            )}
          </ul>
          <div className="">
            {!user ? (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <Link to="/account">
                <Button>Profile</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
