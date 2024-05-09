import { Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { Login } from './components/pages/Auth/Login';
import { Register } from './components/pages/Auth/Register';
import { AuthContextProvider } from './context/AuthContext';
import { Account } from './components/pages/Auth/Account';
import { ProtectedRoute } from './components/pages/Auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
