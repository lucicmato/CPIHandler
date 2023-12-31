import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ErrorPage from './routing/ErrorPage';
import Client from './view/client/Client';
import Product from './view/product/Product';
import Invoices from './view/invoices/Invoices';
import LogIn from './view/login/LogIn';

import './index.css';

const router = createBrowserRouter([
  { path: '/login', element: <LogIn />, errorElement: <ErrorPage /> },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Client />,
      },
      {
        path: '/product',
        element: <Product />,
      },
      {
        path: '/invoices',
        element: <Invoices />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />,
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
