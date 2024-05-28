import { Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { Login } from './components/pages/Auth/Login';
import { Register } from './components/pages/Auth/Register';
import { AuthContextProvider } from './context/AuthContext';
import { Account } from './components/pages/Auth/Account';
import {
  ProtectedRouteUserLoged,
  ProtectedRouteUserUnloged,
} from './components/pages/Auth/ProtectedRoutes';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRouteUserLoged>
                  <Login />
                </ProtectedRouteUserLoged>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteUserUnloged>
                  <Register />
                </ProtectedRouteUserUnloged>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRouteUserUnloged>
                  <Account />
                </ProtectedRouteUserUnloged>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
