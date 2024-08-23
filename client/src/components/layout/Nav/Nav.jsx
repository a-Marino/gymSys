import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { UserAuth } from '../../../context/AuthContext';

export const Nav = () => {
  const { logout, userData, user } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar isBordered className="dark text-white" maxWidth="full">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link className="font-semibold text-inherit text-2xl" href="/">
            GYM
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 text-white" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-semibold text-inherit text-2xl">
            GYM
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/plans" className="text-white">
            Plans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
            Equipment
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="/classes">
            Classes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
            Contact Us
          </Link>
        </NavbarItem>
        {((userData && userData.rol === 'admin') || (userData && userData.rol === 'staff')) && (
          <NavbarItem>
            <Link className="text-blue-600" href="/users">
              User List
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {!userData ? (
            <div className="flex gap-2">
              <Button as={Link} color="primary" href="/login">
                Login
              </Button>
              <Button
                as={Link}
                color="primary"
                href="/signup"
                variant="bordered"
                className="hidden md:flex"
              >
                Register
              </Button>
            </div>
          ) : (
            <div>
              <div className="hidden md:flex">
                <Dropdown className="dark text-white">
                  <DropdownTrigger>
                    <Avatar
                      name={userData.name}
                      style={
                        userData.avatarColors
                          ? {
                              background: `linear-gradient(to right, ${userData.avatarColors[0]}, ${userData.avatarColors[1]})`,
                              color: 'black',
                            }
                          : { background: 'gold', color: 'black' }
                      }
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User options" variant="flat">
                    <DropdownItem key="profile" href="/account">
                      Profile
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Avatar
                as={Link}
                href="/account"
                name={userData.name}
                className="md:hidden"
                style={
                  userData.avatarColors
                    ? {
                        background: `linear-gradient(to right, ${userData.avatarColors[0]}, ${userData.avatarColors[1]})`,
                        color: 'black',
                      }
                    : { background: 'gold', color: 'black' }
                }
              />
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-black text-white">
        <NavbarMenuItem className="space-y-3">
          <Link className="w-full text-white" href="/plans" size="lg">
            Plans
          </Link>
          <Link className="w-full text-white" href="#" size="lg">
            Equipment
          </Link>
          <Link className="w-full text-white" href="#" size="lg">
            About Us
          </Link>
          <Link className="w-full text-white" href="#" size="lg">
            Contact Us
          </Link>
          <Link className="w-full text-white" href="/classes" size="lg">
            Classes
          </Link>
          {userData && (
            <Link className="w-full text-white" href="#" size="lg">
              Classes
            </Link>
          )}
          {((userData && userData.rol === 'admin') || (userData && userData.rol === 'staff')) && (
            <Link className="w-full text-blue-600" href="/users" size="lg">
              User List
            </Link>
          )}
          {userData && (
            <Link className="w-full text-red-600" href="/" size="lg" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
