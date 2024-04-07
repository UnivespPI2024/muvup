import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import '../estilos/header.css';

const Header = ({ logOut }) => {
  return (
    <header className="header">
      <button className="header__logout" onClick={logOut}>
        <FontAwesomeIcon icon={faSignOut}/>
      </button>
    </header>
  );
};

export default Header;