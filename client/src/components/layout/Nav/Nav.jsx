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
  User,
} from '@nextui-org/react';
import { UserAuth } from '../../../context/AuthContext';

export const Nav = () => {
  const { logout, userData } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar isBordered className="bg-black text-white" maxWidth="xl">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            GYM
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 text-white" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            GYM
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link href="#" className="text-white">
            Plans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="#">
            Equipment
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
        {userData && userData.rol === 'admin' && (
          <NavbarItem>
            <Link className="text-blue-600" href="/register">
              Add User
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {!userData ? (
            <Button as={Link} color="primary" href="/login" variant="ghost">
              Login
            </Button>
          ) : (
            <div>
              <User
                as={Link}
                name={userData.name}
                description={userData.rol}
                href="/account"
                className="hidden md:flex"
              />
              <User
                as={Link}
                href="/account"
                className="md:hidden"
                avatarProps={{ name: userData.name }}
              />
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-black text-white">
        <NavbarMenuItem className="space-y-3">
          <Link className="w-full text-white" href="#" size="lg">
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
          {userData && (
            <Link className="w-full text-white" href="#" size="lg">
              Classes
            </Link>
          )}
          {userData && userData.rol === 'admin' && (
            <Link className="w-full text-blue-600" href="/register" size="lg">
              Add User
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
