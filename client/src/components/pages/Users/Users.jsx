import { UserAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Spinner,
  Button,
} from '@nextui-org/react';
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../../common/Credenza';
import { Eye, Pencil, UserRoundX, UserRoundCheck, Plus } from 'lucide-react';
import useSWR from 'swr';
import { useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from '../Auth/Register';

export const Users = () => {
  const { userData, changeUserStatus, createUser } = UserAuth();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(
    `${import.meta.env.VITE_GYM_API_URL}/api/users`,
    fetcher
  );
  const users = data;

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROL', uid: 'rol' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const handleSubmit = async (email, password, name, rol) => {
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
        mutate();
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

  const handleStatusChange = async (userID) => {
    document.body.style.cursor = 'wait';
    try {
      const res = await changeUserStatus(userID);
      toast(res.message, {
        position: 'bottom-right',
        autoClose: 4000,
        icon: false,
        className: 'bg-success text-white',
        hideProgressBar: true,
      });
      mutate();
    } catch (err) {
      toast.error('Hubo un error al cambiar el estado del usuario', {
        position: 'bottom-right',
        autoClose: 4000,
        icon: false,
        className: 'bg-danger text-white',
        hideProgressBar: true,
      });
    } finally {
      document.body.style.cursor = 'default';
    }
  };

  useEffect(() => {
    mutate();
  }, [userData]);

  return userData && userData.rol === 'admin' ? (
    <div className="min-h-[92vh] flex flex-col p-7 space-y-10">
      <h1 className="text-4xl font-semibold">List of Users</h1>
      {!isLoading ? (
        <div>
          <div className="mb-7">
            <Credenza>
              <CredenzaTrigger asChild>
                <Button color="primary" endContent={<Plus />}>
                  Add New
                </Button>
              </CredenzaTrigger>
              <CredenzaContent>
                <CredenzaHeader>
                  <CredenzaTitle className="mb-3">Add New User</CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody>
                  <Register handleSubmit={handleSubmit} />
                </CredenzaBody>
                <CredenzaFooter>
                  <Button color="primary" type="submit" form="registerForm" CredenzaClose>
                    Add
                  </Button>
                  <CredenzaClose asChild></CredenzaClose>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>

          <Table aria-label="List of Users">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <User
                      avatarProps={{
                        name: user.name,
                        isBordered: true,
                        className: 'text-black',
                        style: user.avatarColors
                          ? {
                              background: `linear-gradient(to right, ${user.avatarColors[0]}, ${user.avatarColors[1]})`,
                            }
                          : { background: 'gold' },
                      }}
                      description={user.email}
                      name={user.name}
                    >
                      {user.email}
                    </User>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="text-bold text-sm capitalize">{user.rol}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={user.disabled === false ? 'success' : 'danger'}
                      size="sm"
                      variant="flat"
                    >
                      {user.disabled === false ? 'active' : 'disabled'}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Details">
                        <span className="text-default-400 cursor-pointer active:opacity-50">
                          <Eye size={21} />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <Pencil size={21} />
                        </span>
                      </Tooltip>
                      <Tooltip
                        color={user.disabled === true ? 'success' : 'danger'}
                        content={user.disabled === true ? 'Enable User' : 'Disable User'}
                      >
                        <span className="text-lg cursor-pointer active:opacity-50">
                          {user.disabled === true ? (
                            <UserRoundCheck
                              size={21}
                              onClick={() => handleStatusChange(user.uid)}
                              className="text-success"
                            />
                          ) : (
                            <UserRoundX
                              size={21}
                              onClick={() => handleStatusChange(user.uid)}
                              className="text-danger"
                            />
                          )}
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ToastContainer />
        </div>
      ) : (
        <Spinner className="my-auto  flex-1" label="Loading users..." />
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
};
