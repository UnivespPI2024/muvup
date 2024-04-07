import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Login from './views/Login'
import App from './App'
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Login />
  },
  {
    path:'/app',
    element:<App />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
