import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './AuthorizationPage/components/sections/UserContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

