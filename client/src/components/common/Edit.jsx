import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { UserAuth } from '../../context/AuthContext';

export const Edit = function ({ handleSubmitEdit, user }) {
  const [email, setEmail] = useState(user.email);
  const [rol, setRol] = useState(user.rol);
  const [name, setName] = useState(user.name);
  const [dni, setDni] = useState(user?.dni);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);

  const { userData } = UserAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmitEdit(user.uid, email, name, rol, dni, phone, address);
  };

  return (
    <form
      id="editForm"
      name="editForm"
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full gap-5"
    >
      <div className="flex flex-col md:flex-row w-full gap-5">
        <div className="flex flex-col gap-5 w-full">
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            defaultValue={user.name}
            label="Name"
            labelPlacement="inside"
            variant="bordered"
            required
          />
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={user.email}
            label="Email"
            labelPlacement="inside"
            variant="bordered"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="number"
            onChange={(e) => setDni(e.target.value)}
            defaultValue={user?.dni}
            label="DNI"
            labelPlacement="inside"
            variant="bordered"
            required
          />
          <Input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            defaultValue={user?.address}
            label="Address"
            labelPlacement="inside"
            variant="bordered"
            required
          />
        </div>
      </div>
      <PhoneInput
        onChange={(value) => setPhone(value)}
        value={user?.phone}
        placeholder="Enter phone number"
        defaultCountry="AR"
        className="w-full [&_input]:bg-transparent [&_input]:p-3 [&_input]:border-2 [&_input]:border-default [&_input]:rounded-xl [&_select]:bg-content1 [&_select]:p-2 [&_select]:scrollbar-hide [&_select]:text-default-600 "
        required
      />
      {userData && userData.rol === 'admin' && (
        <Select
          id="rol"
          name="rol"
          onValueChange={(rol) => {
            setRol(rol);
          }}
          defaultValue={user?.rol}
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
