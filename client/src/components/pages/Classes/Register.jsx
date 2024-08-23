import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Input } from '@nextui-org/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../common/Select';

export const Register = () => {
  const [name, setName] = useState('');
  const [days, setDays] = useState([]);
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState(['', '']);
  const [professor, setProfessor] = useState();

  const { userData } = UserAuth();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      id="addClassForm"
      name="addClasForm"
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full gap-5"
    >
      <Input
        type="text"
        onChange={(e) => setName(e.target.value)}
        label="Name"
        labelPlacement="inside"
        variant="bordered"
        required
      />
    </form>
  );
};
