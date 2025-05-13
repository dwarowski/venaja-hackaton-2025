import React from 'react';
import './App.css';
import './Scroll.css';
import { ModalProvider } from './global_functions/Modal_window';
import { User } from './global_functions/global_interfaces';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Login from './AuthorizationPage/components/sections/AuthorizationPage';
import Volunteer from './VolunteerPage/Volunteer';
import OrganiserPage from './OrganiserPage/Organiser';
import { useUser } from './AuthorizationPage/components/sections/UserContext';

function App() {
  const { user, setUser } = useUser();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={(user) => {
                setUser(user);
              }}
            />
          }
        />

        <Route
          path="/volunteer/*"
          element={
            user?.role === 'volunteer' ? (
              <ProtectedLayout user={user}>
                <Volunteer />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/organiser/*"
          element={
            user?.role === 'organiser' ? (
              <ProtectedLayout user={user}>
                <OrganiserPage />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Редирект по умолчанию */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

// 🔒 Обёртка для интерфейса после входа
const ProtectedLayout: React.FC<{ user: User; children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/upper_line.svg" className="header-image" />
        <div className="functional-header">
          <a href="http://www.sberbank.ru">
            <img src="/logo.svg" className="header-logo" />
          </a>
        </div>
      </header>

      <ModalProvider>{children}</ModalProvider>

      <footer>
        <p>Powered by Venaja</p>
      </footer>
    </div>
  );
};
