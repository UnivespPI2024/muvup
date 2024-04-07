import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Login from './views/Login'
import App from './App'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App2() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' index element={<Login />} />
          <Route path='/app' index element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App2/>);

reportWebVitals();
