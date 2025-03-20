import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/main.scss"
import Routers from './routers/index';
import { AuthProvider } from './utils/AuthContext';
import Header from './components/Header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <Header />
    <Routers />
  </AuthProvider>
);

