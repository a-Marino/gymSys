import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../common/Select';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';

export const Register = function ({ handleSubmit }) {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password, name, rol);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white dark gap-5">
      <form
        id="registerForm"
        name="registerForm"
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-5 w-[100%]"
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
        <Select
          id="rol"
          name="rol"
          onValueChange={(rol) => {
            setRol(rol);
          }}
          required
        >
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
    </div>
  );
};
