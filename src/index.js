import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Login from './screens/Login'
import Aluno from './screens/Aluno'
import Professor from './screens/Professor'
import Administrador from './screens/Administrador'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' index element={<Login />} />
          <Route path='/aluno' element={<Aluno />} />
          <Route path='/professor' element={<Professor />} />
          <Route path='/admin' element={<Administrador />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

reportWebVitals();
