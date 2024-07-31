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
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../../common/Credenza';
import { Pencil, UserRoundX, UserRoundCheck, Plus, User as UserIcon } from 'lucide-react';
import useSWR from 'swr';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from '../Auth/Register';
import { Edit } from '../../common/Edit';

export const Users = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const { userData, changeUserStatus, createUser, editUser } = UserAuth();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, isLoading, mutate } = useSWR(
    `${import.meta.env.VITE_GYM_API_URL}/api/users`,
    fetcher
  );
  const users = data;

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROL', uid: 'rol', className: 'hidden md:table-cell' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const handleEditClick = (userId) => {
    setOpenEdit(true);
    setEditingUserId(userId);
  };

  const handleSubmit = async (email, password, name, rol, dni, phone, address) => {
    try {
      const res = await createUser(email, password, name, rol, dni, phone, address);
      if (res && res.message) {
        toast.success(res.message, {
          position: 'bottom-right',
          autoClose: 2000,
          icon: false,
          className: 'bg-success text-white',
          hideProgressBar: true,
        });
        setOpenRegister(false);
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

  const handleSubmitEdit = async (uid, email, name, rol, dni, phone, address) => {
    try {
      const res = await editUser(uid, email, name, rol, dni, phone, address);
      if (res && res.message) {
        toast.success(res.message, {
          position: 'bottom-right',
          autoClose: 2000,
          icon: false,
          className: 'bg-success text-white',
          hideProgressBar: true,
        });
        setOpenEdit(false);
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

  return (userData && userData.rol === 'admin') || (userData && userData.rol === 'staff') ? (
    <div className="min-h-[92vh] flex flex-col p-7 space-y-10">
      <h1 className="text-4xl font-semibold">List of Users</h1>
      {!isLoading ? (
        <div>
          <div className="mb-7">
            <Credenza open={openRegister} onOpenChange={setOpenRegister}>
              <CredenzaTrigger asChild>
                <Button color="primary" endContent={<Plus />}>
                  Add New
                </Button>
              </CredenzaTrigger>
              <CredenzaContent className="md:min-w-[950px]">
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
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>

          <Table aria-label="List of Users">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.uid} className={column.className}>
                  {column.name}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell className="flex items-center gap-5">
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
                    {userData.uid === user.uid && (
                      <Tooltip content="You">
                        <UserIcon size={20} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <p className="text-bold text-sm capitalize">{user.rol}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize cursor-default"
                      color={user.disabled === false ? 'success' : 'danger'}
                      size="sm"
                      variant="flat"
                    >
                      {user.disabled === false ? 'active' : 'disabled'}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Credenza open={openEdit} onOpenChange={setOpenEdit}>
                        <CredenzaTrigger asChild>
                          <div onClick={() => handleEditClick(user.uid)}>
                            <Tooltip content="Edit user">
                              <Pencil size={21} className="text-default-400" />
                            </Tooltip>
                          </div>
                        </CredenzaTrigger>
                        {editingUserId === user.uid && (
                          <CredenzaContent>
                            <CredenzaHeader>
                              <CredenzaTitle className="mb-3">Edit user</CredenzaTitle>
                            </CredenzaHeader>
                            <CredenzaBody>
                              <div className="flex flex-col gap-5">
                                <Edit user={user} handleSubmitEdit={handleSubmitEdit} />
                                {user.uid !== userData.uid && (
                                  <div className="flex gap-5 items-center">
                                    <span className="text-lg cursor-pointer active:opacity-50">
                                      {user.disabled === true ? (
                                        <Button
                                          isIconOnly
                                          onClick={() => handleStatusChange(user.uid)}
                                          className="bg-success"
                                        >
                                          <UserRoundCheck size={21} className="text-black" />
                                        </Button>
                                      ) : (
                                        <Button
                                          onClick={() => handleStatusChange(user.uid)}
                                          isIconOnly
                                          className="bg-danger"
                                        >
                                          <UserRoundX size={21} className="text-black" />
                                        </Button>
                                      )}
                                    </span>
                                    <span className="text-default-600">
                                      {user.disabled === true
                                        ? 'Activate user'
                                        : 'Desactivate User'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </CredenzaBody>
                            <CredenzaFooter>
                              <Button color="primary" type="submit" form="editForm">
                                Save
                              </Button>
                            </CredenzaFooter>
                          </CredenzaContent>
                        )}
                      </Credenza>
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
