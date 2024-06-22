import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Input } from '@nextui-org/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../common/Select';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = function () {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { createUser, userData } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUser(email, password, name, rol);
      if (res && res.message) {
        toast.success(res.message, {
          position: 'bottom-right',
          autoClose: 2000,
          icon: false,
          className: 'bg-success text-white',
          hideProgressBar: true,
        });
      }
      toast.error(res, {
        position: 'bottom-right',
        autoClose: 2000,
        icon: false,
        theme: 'colored',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white w-full dark gap-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 w-[60%]"
      >
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          label="Name"
          labelPlacement="inside"
          variant="bordered"
          required
        />
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          labelPlacement="inside"
          variant="bordered"
          required
        />
        <Input
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          variant="bordered"
        />
        <Select id="rol" name="rol" onChange={(e) => setRol(e.target.value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin" key="admin">
              Admin
            </SelectItem>
            <SelectItem value="user" key="user">
              User
            </SelectItem>
          </SelectContent>
        </Select>
      </form>
      <ToastContainer />
    </div>
  );
};
