import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Input } from '@nextui-org/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../common/Select';
import { EyeFilledIcon } from '../../../assets/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../assets/Icons/EyeSlashFilledIcon';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export const Register = function ({ handleSubmit }) {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('member');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { userData } = UserAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password, name, rol, dni, phone, address);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <form
      id="registerForm"
      name="registerForm"
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full gap-5"
    >
      <div className="flex flex-col md:flex-row w-full gap-5">
        <div className="flex flex-col gap-5 w-full">
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
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="number"
            onChange={(e) => setDni(e.target.value)}
            label="DNI"
            labelPlacement="inside"
            variant="bordered"
            required
          />
          <Input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            label="Address"
            labelPlacement="inside"
            variant="bordered"
            required
          />
          <PhoneInput
            onChange={(value) => setPhone(value)}
            placeholder="Enter phone number"
            defaultCountry="AR"
            className="[&_input]:bg-transparent [&_input]:p-3 [&_input]:border-2 [&_input]:border-default [&_input]:rounded-xl [&_select]:bg-content1 [&_select]:p-2 [&_select]:scrollbar-hide [&_select]:text-default-600 "
          />
        </div>
      </div>
      {userData && userData.rol === 'admin' && (
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
            <SelectItem value="member" key="member">
              Member
            </SelectItem>
            <SelectItem value="professor" key="professor">
              Professor
            </SelectItem>
            <SelectItem value="staff" key="staff">
              Staff
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </form>
  );
};
