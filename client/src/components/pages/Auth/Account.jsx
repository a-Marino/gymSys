// import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { Spinner, Avatar } from '@nextui-org/react';

export const Account = function () {
  const { userData, isLoading } = UserAuth();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate('/');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return !isLoading ? (
    <div className="px-5 mt-14">
      <h1 className="text-3xl font-semibold">Account</h1>
      <div className="mt-6 flex items-center gap-10">
        <Avatar
          name={userData.name}
          className="h-32 w-32 text-2xl"
          isBordered
          style={{
            background: `linear-gradient(to right, ${userData.avatarColors[0]}, ${userData.avatarColors[1]})`,
          }}
        />
        <div>
          <p className="text-2xl font-bold">{userData.name}</p>
          <p className="font-semibold text-black/70">{userData.email}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-[90vh]">
      <Spinner />
    </div>
  );
};
