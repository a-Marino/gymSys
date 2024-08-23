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
import { Plans } from './components/pages/Plans/Plans';
import { Classes } from './components/pages/Classes/Classes';
import { Users } from './components/pages/Users/Users';
import { SignUp } from './components/pages/Auth/SignUp';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/classes" element={<Classes />} />
            <Route element={<ProtectedRouteUserUnloged />}>
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/account" element={<Account />} />
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={
                <ProtectedRouteUserLoged>
                  <Login />
                </ProtectedRouteUserLoged>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
