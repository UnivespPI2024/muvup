import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import '../estilos/header.css';

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <h1 className="header__title">Meu Aplicativo</h1>
      <button className="header__logout" onClick={onLogout}>
        <FontAwesomeIcon icon={faPenToSquare} style={{color:'white'}}/>
      </button>
    </header>
  );
};

export default Header;