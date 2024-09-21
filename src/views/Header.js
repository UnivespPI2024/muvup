import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faSignOut } from '@fortawesome/free-solid-svg-icons';
import '../estilos/header.css';

const Header = ({ logOut, aumFonte, dimFonte }) => {
  return (
    <view>
      <header className="header">
        <button className="header__searchPlus" onClick={aumFonte}>
          <FontAwesomeIcon icon={faSearchPlus} color='#FFF' />
        </button>
        <button className="header__searchMinus" onClick={dimFonte}>
          <FontAwesomeIcon icon={faSearchMinus} color='#FFF' />
        </button>
        <button className="header__logout" onClick={logOut}>
          <FontAwesomeIcon icon={faSignOut} color='#FFF' />
        </button>
      </header>
    </view>
  );
};

export default Header;